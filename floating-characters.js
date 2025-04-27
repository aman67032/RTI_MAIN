document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to floating characters
    const floatingCharacters = document.querySelectorAll('.floating-character');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingCharacters.forEach(character => {
            // Different characters move at different speeds and directions
            const speed = character.classList.contains('document-char') ? 30 : 
                         character.classList.contains('magnifier-char') ? 20 :
                         character.classList.contains('lightbulb-char') ? 25 : 15;
            
            // Calculate movement based on mouse position
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            
            // Apply transform with existing animations
            character.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Add scroll effects
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Get all section transitions
        const sectionTransitions = document.querySelectorAll('.section-transition');
        
        // Add fade-in effect to section transitions when they come into view
        sectionTransitions.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = 1;
            } else {
                section.style.opacity = 0.5;
            }
        });
        
        // Scale effect for story characters on scroll
        const storyCharacters = document.querySelectorAll('.story-character');
        storyCharacters.forEach(character => {
            const characterTop = character.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (characterTop < windowHeight * 0.8 && characterTop > 0) {
                character.style.transform = 'scale(1.1)';
            } else {
                character.style.transform = 'scale(1)';
            }
        });
    });
    
    // Create random moving dots in background of certain sections
    const sections = [
        document.querySelector('.success-stories-section'),
        document.querySelector('.learning-resources-section')
    ];
    
    sections.forEach(section => {
        if (!section) return;
        
        // Create container for particles
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '0';
        
        // Add to section
        section.style.position = 'relative';
        section.prepend(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 15; i++) {
            createParticle(particlesContainer);
        }
    });
    
    function createParticle(container) {
        const particle = document.createElement('div');
        
        // Random size between 5-10px
        const size = Math.random() * 5 + 5;
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 215, 0, 0.3)'; // Gold with transparency
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10; // 10-20s
        
        // Create and apply keyframe animation
        particle.style.animation = `floatingParticle ${duration}s linear infinite`;
        
        // Add to container
        container.appendChild(particle);
        
        // Create keyframes for this particle
        createParticleKeyframes(particle, duration);
    }
    
    function createParticleKeyframes(particle, duration) {
        // Generate random start and end positions
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        // Create the animation
        particle.animate([
            { 
                transform: `translate(${startX}%, ${startY}%)`,
                opacity: 0.2
            },
            { 
                transform: `translate(${endX}%, ${endY}%)`, 
                opacity: 0.8,
                offset: 0.5
            },
            { 
                transform: `translate(${startX}%, ${startY}%)`,
                opacity: 0.2
            }
        ], {
            duration: duration * 1000,
            iterations: Infinity
        });
    }
    
    // Add hover effects to story cards
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const character = this.querySelector('.story-character');
            if (character) {
                character.style.transform = 'scale(1.2) translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const character = this.querySelector('.story-character');
            if (character) {
                character.style.transform = 'scale(1) translateY(0)';
            }
        });
    });
}); 