class Navigation {
    constructor(portalType) {
        this.portalType = portalType;
        this.init();
    }

    init() {
        // Add mobile menu functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.modern-nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }

        // Add active state to current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add('active');
            }
        });

        // Add portal-specific styling
        document.body.classList.add(`${this.portalType}-theme`);
        
        // Initialize dropdown menu functionality
        this.initializeDropdowns();
    }
    
    initializeDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.nextElementSibling;
                dropdown.classList.toggle('show');
                
                // Close all other open dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.nextElementSibling.classList.remove('show');
                    }
                });
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item-with-dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }

    static createHeader(portalName) {
        return `
            <header class="modern-header">
                <div class="header-container">
                    <div class="header-left">
                        <a href="index.html" class="logo">
                            <i class="fas fa-book-reader logo-icon"></i>
                            <span class="portal-logo-text">${portalName}</span>
                        </a>
                        
                        <div class="portal-switcher">
                            <a href="../index.html" class="portal-switcher-btn">
                                <i class="fas fa-home"></i>
                                <span>Main Portal</span>
                            </a>
                        </div>
                    </div>
                    
                    <nav class="modern-nav">
                        <ul class="nav-list">
                            <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-home nav-icon"></i> Home</a></li>
                            <li class="nav-item"><a href="guide.html" class="nav-link"><i class="fas fa-info-circle nav-icon"></i> Guide</a></li>
                            <li class="nav-item"><a href="forms.html" class="nav-link"><i class="fas fa-file-alt nav-icon"></i> Forms</a></li>
                            <li class="nav-item"><a href="track.html" class="nav-link"><i class="fas fa-search nav-icon"></i> Track</a></li>
                            <li class="nav-item"><a href="resources.html" class="nav-link"><i class="fas fa-folder-open nav-icon"></i> Resources</a></li>
                        </ul>
                    </nav>
                    
                    <div class="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
            </header>
        `;
    }
} 