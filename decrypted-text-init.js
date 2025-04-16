document.addEventListener('DOMContentLoaded', function() {
  // Wait for the loading screen to disappear before initializing DecryptedText
  let loadingScreenGone = false;
  
  // Listen for the custom event from loading-screen.js
  document.addEventListener('loadingScreenHidden', function() {
    console.log("Loading screen hidden event received");
    if (!loadingScreenGone) {
      loadingScreenGone = true;
      initializeDecryptedText();
    }
  });
  
  // Check if loading screen exists and set up observer
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    // Set up a mutation observer to detect when loading screen is removed or hidden
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'style' && 
            (loadingScreen.style.opacity === '0' || loadingScreen.style.display === 'none')) {
          if (!loadingScreenGone) {
            loadingScreenGone = true;
            initializeDecryptedText();
            observer.disconnect();
          }
        }
      });
    });
    
    observer.observe(loadingScreen, { attributes: true });
    
    // Also check if loading screen is already hidden
    if (loadingScreen.style.opacity === '0' || loadingScreen.style.display === 'none' || 
        window.getComputedStyle(loadingScreen).opacity === '0' || 
        window.getComputedStyle(loadingScreen).display === 'none') {
      if (!loadingScreenGone) {
        loadingScreenGone = true;
        initializeDecryptedText();
      }
    }
    
    // Fallback: If loading screen doesn't disappear after 5 seconds, initialize anyway
    setTimeout(function() {
      if (!loadingScreenGone) {
        loadingScreenGone = true;
        initializeDecryptedText();
      }
    }, 5000);
  } else {
    // No loading screen found, initialize immediately
    loadingScreenGone = true;
    initializeDecryptedText();
  }
  
  // Function to create a DecryptedText element
  function createDecryptedText(options) {
    const {
      text,
      speed = 50,
      maxIterations = 10,
      sequential = false,
      revealDirection = 'start',
      useOriginalCharsOnly = false,
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      className = 'decrypted-letter',
      parentClassName = 'decrypted-text-wrapper',
      encryptedClassName = 'encrypted-letter',
      animateOn = 'hover',
      targetElement
    } = options;

    // Create the main wrapper span
    const wrapperSpan = document.createElement('span');
    wrapperSpan.className = parentClassName;
    wrapperSpan.style.display = 'inline-block';
    wrapperSpan.style.whiteSpace = 'pre-wrap';

    // Create the screen reader only span
    const srOnlySpan = document.createElement('span');
    srOnlySpan.style.position = 'absolute';
    srOnlySpan.style.width = '1px';
    srOnlySpan.style.height = '1px';
    srOnlySpan.style.padding = '0';
    srOnlySpan.style.margin = '-1px';
    srOnlySpan.style.overflow = 'hidden';
    srOnlySpan.style.clip = 'rect(0,0,0,0)';
    srOnlySpan.style.border = '0';
    srOnlySpan.textContent = text;
    wrapperSpan.appendChild(srOnlySpan);

    // Create the visible text span
    const visibleSpan = document.createElement('span');
    visibleSpan.setAttribute('aria-hidden', 'true');
    wrapperSpan.appendChild(visibleSpan);

    // Split the text into individual character spans
    const chars = text.split('');
    chars.forEach(char => {
      const charSpan = document.createElement('span');
      charSpan.className = className;
      charSpan.textContent = char;
      visibleSpan.appendChild(charSpan);
    });

    // Variables for the animation
    let isHovering = false;
    let isScrambling = false;
    let interval;
    let currentIteration = 0;
    const revealedIndices = new Set();
    let hasAnimated = false;

    // Function to get the next index to reveal based on the reveal direction
    function getNextIndex() {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedIndices.size;
        case 'end':
          return textLength - 1 - revealedIndices.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedIndices.size / 2);
          const nextIndex =
            revealedIndices.size % 2 === 0
              ? middle + offset
              : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedIndices.has(nextIndex)) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedIndices.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedIndices.size;
      }
    }

    // Function to shuffle the text
    function shuffleText() {
      const availableChars = useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
        : characters.split('');

      const charElements = visibleSpan.children;
      
      for (let i = 0; i < charElements.length; i++) {
        if (text[i] === ' ') continue;
        if (revealedIndices.has(i)) {
          charElements[i].textContent = text[i];
          charElements[i].className = className;
        } else {
          charElements[i].textContent = availableChars[Math.floor(Math.random() * availableChars.length)];
          charElements[i].className = encryptedClassName;
        }
      }
    }

    // Function to start the animation
    function startAnimation() {
      isHovering = true;
      isScrambling = true;
      currentIteration = 0;
      
      clearInterval(interval);
      interval = setInterval(() => {
        if (sequential) {
          if (revealedIndices.size < text.length) {
            const nextIndex = getNextIndex();
            revealedIndices.add(nextIndex);
            shuffleText();
          } else {
            clearInterval(interval);
            isScrambling = false;
          }
        } else {
          shuffleText();
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            isScrambling = false;
            
            // Reveal all characters
            const charElements = visibleSpan.children;
            for (let i = 0; i < charElements.length; i++) {
              charElements[i].textContent = text[i];
              charElements[i].className = className;
            }
          }
        }
      }, speed);
    }

    // Function to reset the animation
    function resetAnimation() {
      isHovering = false;
      isScrambling = false;
      revealedIndices.clear();
      clearInterval(interval);
      
      // Reset all characters
      const charElements = visibleSpan.children;
      for (let i = 0; i < charElements.length; i++) {
        charElements[i].textContent = text[i];
        charElements[i].className = className;
      }
    }

    // Add event listeners based on animateOn option
    if (animateOn === 'hover') {
      wrapperSpan.addEventListener('mouseenter', startAnimation);
      wrapperSpan.addEventListener('mouseleave', resetAnimation);
    } else if (animateOn === 'view') {
      // Set up Intersection Observer for 'view' animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
            hasAnimated = true;
            observer.disconnect();
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
      
      observer.observe(wrapperSpan);
    }

    // Append the wrapper to the target element
    if (targetElement) {
      targetElement.appendChild(wrapperSpan);
    }
    
    return wrapperSpan;
  }

  // Main function to initialize all DecryptedText elements
  function initializeDecryptedText() {
    console.log("Initializing DecryptedText elements");
    
    // Initialize DecryptedText elements with the 'data-decrypted-text' attribute
    const decryptedTextElements = document.querySelectorAll('[data-decrypted-text]');
    const createdWrappers = [];
    
    decryptedTextElements.forEach(element => {
      const text = element.getAttribute('data-text') || element.textContent;
      const speed = parseInt(element.getAttribute('data-speed') || '50', 10);
      const maxIterations = parseInt(element.getAttribute('data-max-iterations') || '10', 10);
      const sequential = element.hasAttribute('data-sequential');
      const revealDirection = element.getAttribute('data-reveal-direction') || 'start';
      const useOriginalCharsOnly = element.hasAttribute('data-use-original-chars-only');
      const characters = element.getAttribute('data-characters') || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
      const className = element.getAttribute('data-class') || 'decrypted-letter';
      const parentClassName = element.getAttribute('data-parent-class') || 'decrypted-text-wrapper';
      const encryptedClassName = element.getAttribute('data-encrypted-class') || 'encrypted-letter';
      const animateOn = element.getAttribute('data-animate-on') || 'hover';

      // Clear the element's content
      element.textContent = '';

      // Create and append the DecryptedText
      const wrapper = createDecryptedText({
        text,
        speed,
        maxIterations,
        sequential,
        revealDirection,
        useOriginalCharsOnly,
        characters,
        className,
        parentClassName,
        encryptedClassName,
        animateOn,
        targetElement: element
      });
      
      createdWrappers.push(wrapper);
    });

    // Add DecryptedText to specific elements
    // Example: Page title with view animation
    const pageHeaderContent = document.querySelector('.page-header-content h2');
    if (pageHeaderContent) {
      const originalText = pageHeaderContent.textContent;
      pageHeaderContent.textContent = '';
      const wrapper = createDecryptedText({
        text: originalText,
        speed: 30,
        maxIterations: 15,
        sequential: true,
        revealDirection: 'center',
        className: 'decrypted-letter',
        parentClassName: 'decrypted-text-wrapper decrypted-text-title',
        encryptedClassName: 'encrypted-letter',
        animateOn: 'view',
        targetElement: pageHeaderContent
      });
      
      createdWrappers.push(wrapper);
    }

    // Add to timeline items
    const timelineItems = document.querySelectorAll('.timeline-content h3');
    timelineItems.forEach((item, index) => {
      const originalText = item.textContent;
      item.textContent = '';
      const wrapper = createDecryptedText({
        text: originalText,
        speed: 40,
        maxIterations: 12,
        sequential: true,
        revealDirection: 'start',
        className: 'decrypted-letter',
        parentClassName: 'decrypted-text-wrapper decrypted-text-subtitle',
        encryptedClassName: 'encrypted-letter',
        animateOn: 'view',
        targetElement: item
      });
      
      createdWrappers.push(wrapper);
    });
    
    // Make all wrappers visible with a slight delay for a nice staggered effect
    setTimeout(() => {
      createdWrappers.forEach((wrapper, index) => {
        setTimeout(() => {
          wrapper.classList.add('decrypted-text-visible');
        }, index * 50); // Stagger the appearance
      });
    }, 100);
  }
}); 