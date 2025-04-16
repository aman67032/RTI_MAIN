/**
 * GlitchText - Text animation that creates a glitchy effect
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all elements with the glitch-text attribute
  const glitchElements = document.querySelectorAll('[data-glitch-text]');
  
  glitchElements.forEach(element => {
    // Get configuration from data attributes
    const text = element.textContent || element.getAttribute('data-text');
    const speed = parseFloat(element.getAttribute('data-speed') || '1');
    const enableShadows = element.getAttribute('data-enable-shadows') !== 'false';
    const enableOnHover = element.getAttribute('data-enable-on-hover') !== 'false';
    
    // Set inline styles
    element.style.setProperty('--after-duration', `${speed * 3}s`);
    element.style.setProperty('--before-duration', `${speed * 2}s`);
    element.style.setProperty('--after-shadow', enableShadows ? '-5px 0 red' : 'none');
    element.style.setProperty('--before-shadow', enableShadows ? '5px 0 cyan' : 'none');
    
    // Add classes
    element.classList.add('glitch');
    if (enableOnHover) {
      element.classList.add('enable-on-hover');
    }
    
    // Set data-text attribute
    element.setAttribute('data-text', text);
  });
}); 