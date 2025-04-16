class Navigation {
    constructor(portalType) {
        this.portalType = portalType;
        this.init();
    }

    init() {
        // Add mobile menu functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }

        // Add active state to current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add('active');
            }
        });

        // Add portal-specific styling
        document.body.classList.add(`${this.portalType}-theme`);
    }

    static createHeader(portalName) {
        return `
            <header>
                <a href="../index.html" class="back-button">
                    <i class="fas fa-arrow-left"></i> Change Portal
                </a>
                <a href="index.html" class="logo">
                    <span class="portal-logo-text">${portalName}</span>
                </a>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="guide.html">RTI Guide</a></li>
                        <li><a href="forms.html">Forms</a></li>
                        <li><a href="track.html">Track Status</a></li>
                        <li><a href="resources.html">Resources</a></li>
                    </ul>
                </nav>
                <div class="menu-toggle">
                    <i class="fas fa-bars"></i>
                </div>
            </header>
        `;
    }
} 