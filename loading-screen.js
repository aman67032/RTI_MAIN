/**
 * Loading Screen with FuzzyText effect
 */
class LoadingScreen {
  constructor(options = {}) {
    // Check if we're in the teacher portal
    const isTeacherPortal = window.location.href.includes('teacher');
    
    this.options = {
      minDuration: options.minDuration || 2000, // Minimum time to show loading screen (ms)
      text: isTeacherPortal ? 'Teacher Portal' : 'Right to Information',
      subText: isTeacherPortal ? 'RTI India' : 'India',
      loadingMessage: options.loadingMessage || 'Loading resources',
      particleCount: options.particleCount || 30,
      ...options
    };
    
    // Set color scheme based on portal
    this.colorScheme = isTeacherPortal ? {
      primaryColor: "rgba(210, 125, 45, 0.9)",
      secondaryColor: "rgba(94, 139, 126, 0.9)"
    } : {
      primaryColor: "rgba(50, 205, 50, 0.9)",
      secondaryColor: "rgba(15, 224, 255, 0.9)"
    };
    
    this.startTime = Date.now();
    this.resources = {
      images: document.images,
      scripts: Array.from(document.scripts).filter(script => !script.hasAttribute('async')),
      stylesheets: Array.from(document.styleSheets)
    };
    
    this.progress = 0;
    this.isHidden = false;
    
    this.createLoadingScreen();
    this.createParticles();
    this.initFuzzyText();
    this.startLoading();
  }
  
  createLoadingScreen() {
    // Create loading screen container
    this.container = document.createElement('div');
    this.container.className = 'loading-screen';
    
    // Create content container
    this.content = document.createElement('div');
    this.content.className = 'loading-content';
    
    // Create text container
    this.textContainer = document.createElement('div');
    this.textContainer.className = 'loading-text-container';
    
    // Create progress bar
    this.progressContainer = document.createElement('div');
    this.progressContainer.className = 'loading-progress';
    
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'loading-progress-bar';
    this.progressContainer.appendChild(this.progressBar);
    
    // Create loading message
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'loading-message';
    this.messageElement.textContent = this.options.loadingMessage;
    
    this.dots = document.createElement('span');
    this.dots.className = 'loading-dots';
    this.messageElement.appendChild(this.dots);
    
    // Create particles container
    this.particlesContainer = document.createElement('div');
    this.particlesContainer.className = 'particles';
    
    // Assemble the loading screen
    this.content.appendChild(this.textContainer);
    this.content.appendChild(this.progressContainer);
    this.content.appendChild(this.messageElement);
    this.container.appendChild(this.content);
    this.container.appendChild(this.particlesContainer);
    
    // Add to document
    document.body.appendChild(this.container);
    
    // Start the loading dots animation
    this.animateDots();
  }
  
  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = 2 + Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random animation delay and duration
      const delay = Math.random() * 5;
      const duration = 5 + Math.random() * 10;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // Random movement
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      
      this.particlesContainer.appendChild(particle);
    }
  }
  
  initFuzzyText() {
    // Create main text
    this.fuzzyText = new FuzzyText({
      text: this.options.text,
      container: this.textContainer,
      fontSize: "clamp(2rem, 8vw, 5rem)",
      fontWeight: 900,
      color: this.colorScheme.primaryColor,
      baseIntensity: 0.18,
      hoverIntensity: 0.5
    });
    
    // Create sub text if provided
    if (this.options.subText) {
      this.subTextContainer = document.createElement('div');
      this.subTextContainer.style.marginTop = "1rem";
      this.textContainer.appendChild(this.subTextContainer);
      
      this.fuzzySubText = new FuzzyText({
        text: this.options.subText,
        container: this.subTextContainer,
        fontSize: "clamp(1rem, 4vw, 2.5rem)",
        fontWeight: 700,
        color: this.colorScheme.secondaryColor,
        baseIntensity: 0.15,
        hoverIntensity: 0.4
      });
    }
  }
  
  animateDots() {
    let count = 0;
    this.dotsInterval = setInterval(() => {
      this.dots.textContent = '.'.repeat(count % 4);
      count++;
    }, 300);
  }
  
  startLoading() {
    // Track loading progress
    this.checkProgress();
    
    // Listen for window load event
    window.addEventListener('load', () => {
      this.setProgress(100);
      
      // Ensure minimum duration
      const elapsed = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.options.minDuration - elapsed);
      
      setTimeout(() => {
        this.hide();
      }, remainingTime);
    });
  }
  
  checkProgress() {
    const checkInterval = setInterval(() => {
      if (this.isHidden) {
        clearInterval(checkInterval);
        return;
      }
      
      let totalResources = this.resources.images.length + this.resources.scripts.length + this.resources.stylesheets.length;
      let loadedResources = 0;
      
      // Count loaded images
      for (let i = 0; i < this.resources.images.length; i++) {
        if (this.resources.images[i].complete) {
          loadedResources++;
        }
      }
      
      // Assume scripts and stylesheets are loaded
      loadedResources += this.resources.scripts.length + this.resources.stylesheets.length;
      
      // Calculate progress percentage
      const progressPct = totalResources > 0 ? Math.min(100, Math.round((loadedResources / totalResources) * 100)) : 100;
      
      this.setProgress(progressPct);
    }, 200);
  }
  
  setProgress(progress) {
    this.progress = progress;
    this.progressBar.style.width = `${progress}%`;
  }
  
  hide() {
    if (this.isHidden) return;
    
    this.isHidden = true;
    this.container.classList.add('hidden');
    
    // Dispatch a custom event to notify that loading screen is hidden
    document.dispatchEvent(new CustomEvent('loadingScreenHidden'));
    
    // Clean up after transition
    setTimeout(() => {
      clearInterval(this.dotsInterval);
      
      if (this.fuzzyText) {
        this.fuzzyText.cleanup();
      }
      
      if (this.fuzzySubText) {
        this.fuzzySubText.cleanup();
      }
      
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }, 500); // Match the transition duration
  }
}

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.loadingScreen = new LoadingScreen();
}); 