/**
 * Parent RTI Portal - Visual Effects
 * Enhanced visual animations and interactive elements
 */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add particle background to info section
    initParticleBackground();
    
    // Add decorative floating shapes to hero section
    addDecorativeShapes();
    
    // Add scroll indicator
    addScrollIndicator();
    
    // Add section dividers with wave effect
    addSectionDividers();
    
    // Add parallax effect to feature cards
    addFeatureCardParallax();
});

/**
 * Creates particle background in the info section
 */
function initParticleBackground() {
    const particlesContainer = document.querySelector('.particles-background');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            createParticle(particlesContainer);
        }
    }
}

/**
 * Creates a single animated particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100;
    particle.style.left = `${posX}%`;
    particle.style.bottom = `${-posY}px`;
    
    // Random animation duration between 10s and 30s
    const animationDuration = Math.random() * 20 + 10;
    particle.style.animation = `particleAnimation ${animationDuration}s linear infinite`;
    
    // Random delay so they don't all start at the same time
    const animationDelay = Math.random() * 30;
    particle.style.animationDelay = `${animationDelay}s`;
    
    // Random color from our theme
    const colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--parent-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--parent-secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--parent-accent'),
        getComputedStyle(document.documentElement).getPropertyValue('--parent-highlight')
    ];
    
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
}

/**
 * Adds decorative floating shapes to hero section
 */
function addDecorativeShapes() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const shapes = document.createElement('div');
        shapes.className = 'decorative-shapes';
        
        // Add shapes
        const shape1 = document.createElement('div');
        shape1.className = 'floating-shape shape-circle shape-1';
        
        const shape2 = document.createElement('div');
        shape2.className = 'floating-shape shape-circle shape-2';
        
        const shape3 = document.createElement('div');
        shape3.className = 'floating-shape shape-circle shape-3';
        
        const shape4 = document.createElement('div');
        shape4.className = 'floating-shape shape-circle shape-4';
        
        shapes.appendChild(shape1);
        shapes.appendChild(shape2);
        shapes.appendChild(shape3);
        shapes.appendChild(shape4);
        
        heroSection.appendChild(shapes);
    }
}

/**
 * Adds interactive scroll indicator
 */
function addScrollIndicator() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <span>Scroll Down</span>
            <div class="scroll-arrow"></div>
        `;
        
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        heroSection.appendChild(scrollIndicator);
    }
}

/**
 * Adds wave-style section dividers
 */
function addSectionDividers() {
    const sections = document.querySelectorAll('section:not(.hero-section)');
    sections.forEach(section => {
        const divider = document.createElement('div');
        divider.className = 'section-divider';
        divider.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path class="wave-1" d="M0,0 C300,60 600,100 1200,0 L1440,0 L1440,100 L0,100 Z"></path>
                <path class="wave-2" d="M0,0 C600,100 1200,40 1440,80 L1440,100 L0,100 Z"></path>
            </svg>
        `;
        
        section.insertAdjacentElement('beforebegin', divider);
    });
}

/**
 * Adds parallax effect to feature cards
 */
function addFeatureCardParallax() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        // Create parallax container
        const parallaxContainer = document.createElement('div');
        parallaxContainer.className = 'feature-parallax-container';
        
        // Create random shapes
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            
            // Random size class
            const sizeClasses = ['shape-sm', 'shape-md', 'shape-lg'];
            const randomSizeClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
            
            shape.className = `parallax-shape ${randomSizeClass}`;
            
            // Random position
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            
            // Random color variation
            const colors = [
                'var(--parent-primary)', 
                'var(--parent-secondary)', 
                'var(--parent-accent)', 
                'var(--parent-highlight)'
            ];
            
            shape.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Add to container
            parallaxContainer.appendChild(shape);
        }
        
        // Add container to card
        card.appendChild(parallaxContainer);
        
        // Add parallax movement
        card.addEventListener('mousemove', function(e) {
            const shapes = this.querySelectorAll('.parallax-shape');
            const rect = this.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate percentage of mouse position
            const percentX = mouseX / rect.width;
            const percentY = mouseY / rect.height;
            
            // Move each shape with different intensity
            shapes.forEach((shape, index) => {
                // Different movement strength for different shapes
                const intensity = 20 + (index * 5);
                const moveX = (percentX - 0.5) * intensity;
                const moveY = (percentY - 0.5) * intensity;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        // Reset shapes on mouse leave
        card.addEventListener('mouseleave', function() {
            const shapes = this.querySelectorAll('.parallax-shape');
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    });
}

/**
 * Adds tilt effect to cards 
 * This creates a 3D rotation effect as the user moves their mouse
 */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.right-item, .info-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const percentX = mouseX / rect.width - 0.5;
            const percentY = mouseY / rect.height - 0.5;
            
            const tiltX = percentY * 10; // Tilt up/down
            const tiltY = -percentX * 10; // Tilt left/right
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all other effects first
    
    // Then add tilt effect for a polished finish
    initTiltEffect();
}); 