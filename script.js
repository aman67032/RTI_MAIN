// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky header effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.highlight-card, .update-card, .timeline-item, .article-card, .case-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.article-card, .case-card');
            
            searchableElements.forEach(element => {
                const title = element.querySelector('h3').textContent.toLowerCase();
                const content = element.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }

    // Filter functionality for cases page
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                const caseCards = document.querySelectorAll('.case-card');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cases
                if (filter === 'all') {
                    caseCards.forEach(card => card.style.display = 'block');
                } else {
                    caseCards.forEach(card => {
                        const tags = card.querySelectorAll('.case-tag');
                        let hasTag = false;
                        
                        tags.forEach(tag => {
                            if (tag.textContent.toLowerCase() === filter.toLowerCase()) {
                                hasTag = true;
                            }
                        });
                        
                        card.style.display = hasTag ? 'block' : 'none';
                    });
                }
            });
        });
    }

    // Read more functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.update-card, .article-card');
            const content = card.querySelector('p');
            const fullText = content.getAttribute('data-full-text');
            
            if (fullText) {
                if (this.textContent === 'Read More') {
                    content.textContent = fullText;
                    this.textContent = 'Read Less';
                } else {
                    content.textContent = fullText.substring(0, 100) + '...';
                    this.textContent = 'Read More';
                }
            }
        });
    });

    // Modal functionality (example for future use)
    // const modal = document.querySelector('.modal');
    // const openModalButtons = document.querySelectorAll('.open-modal');
    // const closeModalButton = document.querySelector('.close-modal');

    // openModalButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         modal.classList.add('active');
    //     });
    // });

    // closeModalButton.addEventListener('click', function() {
    //     modal.classList.remove('active');
    // });
});

// Article Filters Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.textContent.trim();
                
                // Show all articles if "All" is selected
                if (filter === 'All') {
                    articleCards.forEach(card => {
                        card.style.display = 'flex';
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    });
                } else {
                    // Filter articles based on category
                    articleCards.forEach(card => {
                        const category = card.querySelector('.article-category').textContent.trim();
                        
                        if (category === filter) {
                            card.style.display = 'flex';
                            // Add animation
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            // Hide with animation
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            articleCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').getAttribute('data-full-text').toLowerCase();
                const author = card.querySelector('.author-name')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reset filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0].classList.add('active'); // Set "All" as active
        });
    }
    
    // Read More functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    if (readMoreLinks.length > 0) {
        readMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleContent = this.closest('.article-content');
                const paragraph = articleContent.querySelector('p');
                const fullText = paragraph.getAttribute('data-full-text');
                
                // Toggle between full text and summary
                if (paragraph.getAttribute('data-expanded') === 'true') {
                    paragraph.textContent = fullText.substring(0, 200) + '...';
                    paragraph.setAttribute('data-expanded', 'false');
                    this.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
                } else {
                    paragraph.textContent = fullText;
                    paragraph.setAttribute('data-expanded', 'true');
                    this.innerHTML = 'Read Less <i class="fas fa-arrow-up"></i>';
                }
            });
        });
    }
});

// Pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const paginationItems = document.querySelectorAll('.pagination-item');
    const paginationArrows = document.querySelectorAll('.pagination-arrow');
    
    if (paginationItems.length > 0) {
        // Handle pagination item clicks
        paginationItems.forEach(item => {
            item.addEventListener('click', function() {
                // Skip if it's the ellipsis
                if (this.textContent === '...') return;
                
                // Remove active class from all items
                paginationItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Scroll to top of articles section
                const articlesSection = document.querySelector('.articles');
                if (articlesSection) {
                    window.scrollTo({
                        top: articlesSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
                
                // Here you would typically load the articles for the selected page
                // For demo purposes, we'll just show a message
                console.log(`Loading articles for page ${this.textContent}`);
            });
        });
        
        // Handle pagination arrow clicks
        if (paginationArrows.length === 2) {
            // Previous page
            paginationArrows[0].addEventListener('click', function() {
                const activePage = document.querySelector('.pagination-item.active');
                if (activePage && activePage.previousElementSibling && 
                    activePage.previousElementSibling.classList.contains('pagination-item')) {
                    activePage.previousElementSibling.click();
                }
            });
            
            // Next page
            paginationArrows[1].addEventListener('click', function() {
                const activePage = document.querySelector('.pagination-item.active');
                if (activePage && activePage.nextElementSibling && 
                    activePage.nextElementSibling.classList.contains('pagination-item')) {
                    activePage.nextElementSibling.click();
                }
            });
        }
    }
});

// Auto-update functionality for new content
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for auto-updates
    const updateConfig = {
        checkInterval: 86400000, // Check for updates once a day (in milliseconds)
        lastChecked: localStorage.getItem('lastUpdateCheck') || 0,
        updateEndpoint: 'updates.json', // This would be your actual API endpoint
        lastUpdateTimestamp: localStorage.getItem('lastUpdateTimestamp') || '2025-01-01T00:00:00Z',
        enabled: true // Toggle to enable/disable auto-updates
    };

    // Function to check for new updates
    const checkForUpdates = async function() {
        if (!updateConfig.enabled) return;
        
        const now = Date.now();
        if (now - updateConfig.lastChecked < updateConfig.checkInterval) return;
        
        try {
            // Fetch updates from the JSON file
            const response = await fetch(updateConfig.updateEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch updates');
            }
            
            const data = await response.json();
            
            // Check if there are new updates
            if (data.lastUpdated > updateConfig.lastUpdateTimestamp) {
                // Filter updates that are newer than our last update
                const newUpdates = data.updates.filter(update => {
                    const updateDate = new Date(update.date);
                    const lastUpdate = new Date(updateConfig.lastUpdateTimestamp);
                    return updateDate > lastUpdate;
                });
                
                if (newUpdates.length > 0) {
                    showUpdateNotification(newUpdates);
                    
                    // Update the last update timestamp
                    localStorage.setItem('lastUpdateTimestamp', data.lastUpdated);
                    updateConfig.lastUpdateTimestamp = data.lastUpdated;
                }
            }
            
            // Update last checked time
            localStorage.setItem('lastUpdateCheck', now);
            updateConfig.lastChecked = now;
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    };

    // Function to show notification about new updates
    const showUpdateNotification = function(updates) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        
        // Create notification content
        let notificationHTML = `
            <div class="notification-header">
                <i class="fas fa-bell"></i>
                <span>${updates.length} New RTI Update${updates.length > 1 ? 's' : ''}</span>
                <button class="close-button"><i class="fas fa-times"></i></button>
            </div>
            <div class="notification-updates">
        `;
        
        // Add each update
        updates.slice(0, 3).forEach(update => {
            notificationHTML += `
                <div class="notification-update">
                    <div class="update-date">${formatDate(update.date)}</div>
                    <div class="update-title">${update.title}</div>
                </div>
            `;
        });
        
        // Add "View All" button if there are more than 3 updates
        if (updates.length > 3) {
            notificationHTML += `
                <div class="notification-more">
                    +${updates.length - 3} more updates
                </div>
            `;
        }
        
        notificationHTML += `
            </div>
            <div class="notification-actions">
                <button class="refresh-button">Refresh to View</button>
            </div>
        `;
        
        notification.innerHTML = notificationHTML;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .update-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                max-width: 350px;
                overflow: hidden;
            }
            
            .notification-header {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                background: rgba(0, 0, 0, 0.2);
                gap: 10px;
            }
            
            .notification-header span {
                font-weight: 600;
                flex-grow: 1;
            }
            
            .notification-updates {
                padding: 10px 15px;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .notification-update {
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .notification-update:last-child {
                border-bottom: none;
            }
            
            .update-date {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            .update-title {
                font-weight: 500;
                margin-top: 3px;
            }
            
            .notification-more {
                text-align: center;
                padding: 8px 0;
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            .notification-actions {
                padding: 12px 15px;
                background: rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: flex-end;
            }
            
            .refresh-button {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.3s;
                font-weight: 500;
            }
            
            .refresh-button:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .close-button {
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Add event listeners
        notification.querySelector('.refresh-button').addEventListener('click', function() {
            window.location.reload();
        });
        
        notification.querySelector('.close-button').addEventListener('click', function() {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 15000);
    };

    // Helper function to format dates
    const formatDate = function(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to update the Recent Updates section with new content
    const updateRecentUpdatesSection = async function() {
        const updatesContainer = document.querySelector('.updates-container');
        if (!updatesContainer) return;
        
        try {
            const response = await fetch(updateConfig.updateEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch updates');
            }
            
            const data = await response.json();
            
            // Get the three most recent updates
            const recentUpdates = data.updates.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }).slice(0, 3);
            
            // Clear existing updates
            updatesContainer.innerHTML = '';
            
            // Add new updates
            recentUpdates.forEach(update => {
                const updateCard = document.createElement('div');
                updateCard.className = 'update-card';
                updateCard.innerHTML = `
                    <span class="date">${formatDate(update.date)}</span>
                    <h3>${update.title}</h3>
                    <p data-full-text="${update.fullText}">${update.summary}</p>
                    <a href="${update.url}" class="read-more">Read More</a>
                `;
                updatesContainer.appendChild(updateCard);
            });
            
            // Re-attach event listeners to new Read More links
            const readMoreLinks = updatesContainer.querySelectorAll('.read-more');
            readMoreLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault();
                        const card = this.closest('.update-card');
                        const content = card.querySelector('p');
                        const fullText = content.getAttribute('data-full-text');
                        
                        if (fullText) {
                            if (this.textContent === 'Read More') {
                                content.textContent = fullText;
                                this.textContent = 'Read Less';
                            } else {
                                content.textContent = fullText.substring(0, 100) + '...';
                                this.textContent = 'Read More';
                            }
                        }
                    }
                });
            });
            
        } catch (error) {
            console.error('Error updating recent updates section:', error);
        }
    };

    // Check for updates when page loads
    checkForUpdates();
    
    // Update the Recent Updates section if it exists
    if (document.querySelector('.updates-container')) {
        updateRecentUpdatesSection();
    }
    
    // Set up interval to check periodically
    setInterval(checkForUpdates, 3600000); // Check every hour while page is open
});

// Timeline and Case Studies Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating elements
    const floatingElements = document.querySelector('.floating-elements');
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.classList.add('element');
        element.style.width = `${Math.random() * 100 + 50}px`;
        element.style.height = element.style.width;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDelay = `${i * 2}s`;
        floatingElements.appendChild(element);
    }

    // Initialize Charts
    const casesChart = new Chart(document.getElementById('casesChart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'RTI Applications',
                data: [120, 190, 170, 220, 250, 300],
                borderColor: '#ffd700',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(255, 215, 0, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const successRateChart = new Chart(document.getElementById('successRateChart'), {
        type: 'doughnut',
        data: {
            labels: ['Successful', 'Pending', 'Rejected'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#4CAF50',
                    '#FFC107',
                    '#F44336'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    const responseTimeChart = new Chart(document.getElementById('responseTimeChart'), {
        type: 'bar',
        data: {
            labels: ['< 7 days', '7-14 days', '14-30 days', '> 30 days'],
            datasets: [{
                label: 'Response Time Distribution',
                data: [40, 30, 20, 10],
                backgroundColor: '#ffd700'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Timeline Data
    const timelineData = [
        {
            year: '2005',
            title: 'RTI Act Enacted',
            description: 'The landmark Right to Information Act is passed, giving citizens the legal right to request information from public authorities.'
        },
        {
            year: '2010',
            title: 'Education Sector Focus',
            description: 'Increased focus on using RTI for educational transparency and accountability.'
        },
        {
            year: '2015',
            title: 'Digital RTI Platform',
            description: 'Introduction of online RTI filing system for educational institutions.'
        },
        {
            year: '2020',
            title: 'Mobile App Launch',
            description: 'Launch of mobile application for easy access to RTI services.'
        }
    ];

    // Populate Timeline with enhanced animations
    const timeline = document.querySelector('.timeline');
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.3}s`;
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });

    // Case Studies Data with enhanced content
    const caseStudiesData = [
        {
            icon: 'fa-school',
            title: 'RTE Implementation',
            description: 'An RTI application revealed that over 4,000 schools were violating the Right to Education Act provisions.',
            year: '2012',
            impact: 'High Impact',
            details: 'This case led to significant reforms in school infrastructure and teacher-student ratio compliance.'
        },
        {
            icon: 'fa-coins',
            title: 'Scholarship Fund Misuse',
            description: 'RTI exposed misappropriation of funds meant for student scholarships, resulting in recovery of ₹45 crores.',
            year: '2014',
            impact: 'High Impact',
            details: 'The investigation uncovered a systematic diversion of funds and led to the implementation of a transparent scholarship distribution system.'
        },
        {
            icon: 'fa-chalkboard-teacher',
            title: 'Teacher Appointments',
            description: 'An RTI query uncovered irregularities in the appointment of 12,000 teachers.',
            year: '2016',
            impact: 'Medium Impact',
            details: 'The findings resulted in a complete overhaul of the teacher recruitment process and stricter qualification verification.'
        }
    ];

    // Populate Case Studies with enhanced animations and interactions
    const caseStudiesGrid = document.querySelector('.case-studies-grid');
    caseStudiesData.forEach((caseStudy, index) => {
        const caseCard = document.createElement('div');
        caseCard.className = 'case-card';
        caseCard.style.animationDelay = `${index * 0.3}s`;
        caseCard.innerHTML = `
            <div class="case-icon">
                <i class="fas ${caseStudy.icon}"></i>
            </div>
            <div class="case-content">
                <h3 class="case-title">${caseStudy.title}</h3>
                <p class="case-description">${caseStudy.description}</p>
                <div class="case-meta">
                    <span class="case-year"><i class="far fa-calendar-alt"></i> ${caseStudy.year}</span>
                    <span class="case-impact"><i class="fas fa-chart-line"></i> ${caseStudy.impact}</span>
                </div>
                <button class="case-button" data-details="${caseStudy.details}">Read More</button>
            </div>
        `;
        caseStudiesGrid.appendChild(caseCard);
    });

    // Enhanced scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.timeline-item, .case-card').forEach(el => {
        observer.observe(el);
    });

    // Case study modal functionality
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.case-button').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.getAttribute('data-details');
            modal.querySelector('.modal-body').textContent = details;
            modal.style.display = 'flex';
        });
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});

// Add a navbar handler at the beginning of the script
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks?.contains(event.target);
        const isClickOnToggle = mobileMenu && mobileMenu.contains(event.target);
        
        if (navLinks && navLinks.style.display === 'flex' && !isClickInsideNav && !isClickOnToggle) {
            navLinks.style.display = 'none';
            mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Make active links in navbar
    const currentPath = window.location.pathname;
    const navbarLinks = document.querySelectorAll('.nav-links a:not(.dropdown a)');
    
    navbarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html') ||
            (currentPath.endsWith('index.html') && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });
});

// Main JavaScript file for RTI Education Portal

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const authLinks = document.querySelector('.auth-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (authLinks) {
                authLinks.classList.toggle('active');
            }
        });
        
        // Close mobile menu when clicking outside of it
        document.addEventListener('click', function(e) {
            if (navLinks?.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenu && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove('active');
                if (authLinks) {
                    authLinks.classList.remove('active');
                }
            }
        });
    }
    
    // Initialize statistics with real data
    initializeStatistics();
    
    // Setup interactive features for statistics
    setupStatisticsInteractions();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.stats-card, .chart-box, .highlight-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Start observing
        observer.observe(element);
    });
});

// Enhanced Statistics Section
function initializeStatistics() {
    // RTI Applications Monthly Data
    const applicationMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const applicationData = [756, 892, 1043, 1128, 978, 1256, 1489, 1698, 1845, 2034, 2287, 2496];
    
    // Success Rate Data by Category
    const categoriesData = {
        labels: ['Admissions', 'Scholarships', 'Exam Results', 'Faculty Info', 'Infrastructure', 'Finances'],
        datasets: [
            {
                label: 'Success Rate (%)',
                data: [92, 78, 85, 69, 73, 81],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderWidth: 1,
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
            }
        ]
    };
    
    // Applications Status Data
    const statusData = {
        labels: ['Successful', 'Pending', 'Rejected', 'Under Appeal'],
        datasets: [{
            data: [65, 20, 10, 5],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 15,
            hoverBorderWidth: 2
        }]
    };
    
    // Initialize Charts if they exist
    const applicationsChart = document.getElementById('applicationsChart');
    const successRateChart = document.getElementById('successRateChart');
    const statusChart = document.getElementById('statusChart');
    
    // Configure chart defaults for better appearance on larger displays
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#666';
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.titleFont = {size: 16, weight: 'bold'};
    
    if (applicationsChart) {
        new Chart(applicationsChart, {
            type: 'line',
            data: {
                labels: applicationMonths,
                datasets: [{
                    label: 'RTI Applications Filed',
                    data: applicationData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 9,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly RTI Applications (2023)',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        callbacks: {
                            label: function(context) {
                                return `Applications: ${context.parsed.y.toLocaleString()}`;
                            },
                            title: function(tooltipItems) {
                                return `${tooltipItems[0].label} 2023`;
                            }
                        },
                        displayColors: false
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Applications',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            },
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1500,
                        easing: 'linear'
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                elements: {
                    line: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        });
    }
    
    if (successRateChart) {
        new Chart(successRateChart, {
            type: 'bar',
            data: categoriesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'RTI Success Rate by Category',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        callbacks: {
                            label: function(context) {
                                return `Success Rate: ${context.parsed.y}%`;
                            }
                        },
                        displayColors: true,
                        padding: 12,
                        cornerRadius: 8
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Success Rate (%)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Categories',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                animation: {
                    delay: function(context) {
                        return context.dataIndex * 100;
                    },
                    duration: 2000
                },
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }
        });
    }
    
    if (statusChart) {
        new Chart(statusChart, {
            type: 'doughnut',
            data: statusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'RTI Application Status Distribution',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value}% (${percentage}% of total)`;
                            }
                        },
                        displayColors: true,
                        padding: 12,
                        cornerRadius: 8
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 14
                            },
                            padding: 20,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map(function(label, i) {
                                        const value = data.datasets[0].data[i];
                                        const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((value / total) * 100);
                                        
                                        return {
                                            text: `${label}: ${value}% (${percentage}%)`,
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            strokeStyle: data.datasets[0].borderColor[i],
                                            lineWidth: data.datasets[0].borderWidth,
                                            hidden: isNaN(data.datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    }
                },
                cutout: '60%',
                radius: '90%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }
    
    // Interactive Counters for Statistics
    const statsNumbers = document.querySelectorAll('.stats-number');
    if (statsNumbers.length > 0) {
        statsNumbers.forEach(stat => {
            const targetValue = stat.textContent;
            const suffix = targetValue.match(/[+%]/) ? targetValue.match(/[+%]/)[0] : '';
            const numericValue = parseInt(targetValue.replace(/,|\+|%/g, ''));
            
            // Start from 0
            stat.textContent = '0' + suffix;
            
            // Animate to target value
            let startValue = 0;
            const duration = 2000;
            const increment = numericValue / (duration / 16);
            
            const counter = setInterval(() => {
                startValue += increment;
                
                if (startValue >= numericValue) {
                    stat.textContent = targetValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(startValue).toLocaleString() + suffix;
                }
            }, 16);
        });
    }
}

// Function to handle statistics filters and interactions
function setupStatisticsInteractions() {
    // Filter controls
    const yearFilter = document.getElementById('year-filter');
    const regionFilter = document.getElementById('region-filter');
    const refreshBtn = document.getElementById('refreshStats');
    
    // Chart action buttons
    const downloadButtons = document.querySelectorAll('.chart-action[title="Download CSV"]');
    const fullscreenButtons = document.querySelectorAll('.chart-action[title="View Fullscreen"]');
    
    // Sample data for different years
    const yearData = {
        '2023': {
            applicationData: [756, 892, 1043, 1128, 978, 1256, 1489, 1698, 1845, 2034, 2287, 2496],
            categoryData: [92, 78, 85, 69, 73, 81],
            statusData: [65, 20, 10, 5]
        },
        '2022': {
            applicationData: [634, 721, 843, 967, 823, 1043, 1254, 1422, 1587, 1723, 1896, 2104],
            categoryData: [87, 72, 79, 65, 68, 76],
            statusData: [60, 25, 12, 3]
        },
        '2021': {
            applicationData: [432, 567, 654, 723, 689, 842, 967, 1156, 1287, 1354, 1489, 1654],
            categoryData: [81, 67, 72, 58, 63, 70],
            statusData: [55, 30, 12, 3]
        }
    };
    
    // Sample data for different regions
    const regionData = {
        'all': {
            applicationData: [756, 892, 1043, 1128, 978, 1256, 1489, 1698, 1845, 2034, 2287, 2496],
            categoryData: [92, 78, 85, 69, 73, 81],
            statusData: [65, 20, 10, 5]
        },
        'north': {
            applicationData: [245, 312, 387, 423, 356, 456, 534, 612, 678, 743, 824, 912],
            categoryData: [94, 76, 88, 72, 68, 84],
            statusData: [70, 18, 8, 4]
        },
        'south': {
            applicationData: [302, 345, 398, 412, 365, 487, 534, 587, 634, 712, 798, 867],
            categoryData: [89, 81, 83, 71, 76, 79],
            statusData: [62, 22, 12, 4]
        },
        'east': {
            applicationData: [123, 145, 167, 187, 156, 203, 254, 289, 313, 345, 387, 432],
            categoryData: [86, 73, 81, 67, 72, 78],
            statusData: [58, 25, 12, 5]
        },
        'west': {
            applicationData: [178, 212, 243, 267, 234, 298, 354, 387, 423, 458, 512, 567],
            categoryData: [93, 79, 87, 70, 75, 83],
            statusData: [68, 19, 9, 4]
        }
    };
    
    // Chart instances
    let applicationsChartInstance = null;
    let successRateChartInstance = null;
    let statusChartInstance = null;
    
    // Store references to chart instances after initialization
    function storeChartInstances() {
        const applicationsChart = document.getElementById('applicationsChart');
        const successRateChart = document.getElementById('successRateChart');
        const statusChart = document.getElementById('statusChart');
        
        if (applicationsChart) {
            applicationsChartInstance = Chart.getChart(applicationsChart);
        }
        
        if (successRateChart) {
            successRateChartInstance = Chart.getChart(successRateChart);
        }
        
        if (statusChart) {
            statusChartInstance = Chart.getChart(statusChart);
        }
    }
    
    // Call after charts are initialized
    setTimeout(storeChartInstances, 1000);
    
    // Update charts based on filters
    function updateCharts() {
        const year = yearFilter ? yearFilter.value : '2023';
        const region = regionFilter ? regionFilter.value : 'all';
        
        // Animation for refresh button
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            icon.style.transition = 'transform 0.5s ease';
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 500);
        }
        
        // Create combined data based on filters
        let filteredData;
        
        // If both filters have the same value as their first option, use the default data
        if (year === '2023' && region === 'all') {
            filteredData = yearData['2023'];
        } 
        // If year changed but region is default
        else if (region === 'all') {
            filteredData = yearData[year];
        } 
        // If region changed but year is default
        else if (year === '2023') {
            filteredData = regionData[region];
        } 
        // If both changed, create blended data (simplified for demo)
        else {
            // Average the year and region data as a simple blend
            const yearDataset = yearData[year];
            const regionDataset = regionData[region];
            
            filteredData = {
                applicationData: yearDataset.applicationData.map((val, i) => Math.round((val + regionDataset.applicationData[i]) / 2)),
                categoryData: yearDataset.categoryData.map((val, i) => Math.round((val + regionDataset.categoryData[i]) / 2)),
                statusData: yearDataset.statusData.map((val, i) => Math.round((val + regionDataset.statusData[i]) / 2))
            };
        }
        
        // Update applications chart
        if (applicationsChartInstance) {
            applicationsChartInstance.data.datasets[0].data = filteredData.applicationData;
            applicationsChartInstance.update();
        }
        
        // Update success rate chart
        if (successRateChartInstance) {
            successRateChartInstance.data.datasets[0].data = filteredData.categoryData;
            successRateChartInstance.update();
        }
        
        // Update status chart
        if (statusChartInstance) {
            statusChartInstance.data.datasets[0].data = filteredData.statusData;
            statusChartInstance.update();
        }
        
        // Animate counter stats
        animateCounterStats();
    }
    
    // Animate the statistics cards with new random data within a reasonable range
    function animateCounterStats() {
        const statsNumbers = document.querySelectorAll('.stats-number');
        
        if (statsNumbers.length > 0) {
            // Generate new values with some randomness but within sensible ranges
            const newValues = [
                Math.floor(17500 + Math.random() * 2500) + '+', // Applications
                Math.floor(5000 + Math.random() * 500), // Institutions
                Math.floor(75 + Math.random() * 8) + '%', // Success Rate
                Math.floor(30 + Math.random() * 5) + '%' // Annual Increase
            ];
            
            statsNumbers.forEach((stat, index) => {
                const currentValue = stat.textContent;
                const newValue = newValues[index];
                
                // Extract numeric parts for animation
                const currentNumber = parseInt(currentValue.replace(/[^0-9]/g, ''));
                const newNumber = parseInt(newValue.replace(/[^0-9]/g, ''));
                const suffix = newValue.match(/[+%]/) ? newValue.match(/[+%]/)[0] : '';
                
                // Start the counter animation
                let startValue = currentNumber;
                const duration = 1500;
                const range = newNumber - currentNumber;
                const increment = range / (duration / 16);
                const startTime = Date.now();
                
                const counter = setInterval(() => {
                    const elapsedTime = Date.now() - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
                    
                    const currentValue = Math.floor(currentNumber + (range * easedProgress));
                    
                    if (progress >= 1) {
                        stat.textContent = newValue;
                        clearInterval(counter);
                    } else {
                        stat.textContent = currentValue.toLocaleString() + suffix;
                    }
                }, 16);
            });
        }
    }
    
    // Event listeners for filters
    if (yearFilter) {
        yearFilter.addEventListener('change', updateCharts);
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', updateCharts);
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateCharts);
    }
    
    // Download chart as CSV 
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the parent chart container
            const chartBox = this.closest('.chart-box');
            const chartTitle = chartBox.querySelector('.chart-title').textContent;
            const canvas = chartBox.querySelector('canvas');
            const chart = Chart.getChart(canvas);
            
            if (!chart) return;
            
            // Generate CSV content
            let csvContent = 'data:text/csv;charset=utf-8,';
            
            // Add headers
            csvContent += 'Category,Value\n';
            
            // Add data
            const labels = chart.data.labels;
            const data = chart.data.datasets[0].data;
            
            labels.forEach((label, index) => {
                csvContent += `${label},${data[index]}\n`;
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `${chartTitle.replace(/\s+/g, '_')}.csv`);
            document.body.appendChild(link);
            
            // Trigger download and cleanup
            link.click();
            document.body.removeChild(link);
        });
    });
    
    // Fullscreen chart view
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the parent chart container
            const chartBox = this.closest('.chart-box');
            
            // If browser supports Fullscreen API
            if (chartBox.requestFullscreen) {
                chartBox.requestFullscreen();
            } else if (chartBox.webkitRequestFullscreen) { /* Safari */
                chartBox.webkitRequestFullscreen();
            } else if (chartBox.msRequestFullscreen) { /* IE11 */
                chartBox.msRequestFullscreen();
            }
        });
    });
}

// Portal Categories Animation
function initializePortalCategories() {
    const portalCategories = document.querySelectorAll('.portal-category');
    
    // Staggered entry animation
    portalCategories.forEach((category, index) => {
        // Set initial state
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Staggered animation
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Hover state interaction for portal features
    portalCategories.forEach(category => {
        const features = category.querySelectorAll('.portal-features li');
        
        category.addEventListener('mouseenter', () => {
            features.forEach((feature, index) => {
                feature.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                }, index * 50);
            });
        });
        
        category.addEventListener('mouseleave', () => {
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });
    });
    
    // Interactive icon animation
    portalCategories.forEach(category => {
        const icon = category.querySelector('.portal-icon i');
        
        category.addEventListener('click', (e) => {
            // Only play animation if not clicking on the button
            if (!e.target.closest('.portal-button')) {
                // Add a pulse animation class
                icon.classList.add('pulse-animation');
                
                // Remove class after animation completes
                setTimeout(() => {
                    icon.classList.remove('pulse-animation');
                }, 700);
            }
        });
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const authLinks = document.querySelector('.auth-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (authLinks) {
                authLinks.classList.toggle('active');
            }
        });
        
        // Close mobile menu when clicking outside of it
        document.addEventListener('click', function(e) {
            if (navLinks?.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                if (authLinks) {
                    authLinks.classList.remove('active');
                }
            }
        });
    }
    
    // Initialize statistics with real data
    initializeStatistics();
    
    // Setup interactive features for statistics
    setupStatisticsInteractions();
    
    // Initialize portal categories animations
    initializePortalCategories();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.stats-card, .chart-box, .highlight-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Start observing
        observer.observe(element);
    });
});

// Application Status Pie Chart
const statusChartCtx = document.getElementById('statusChart').getContext('2d');
new Chart(statusChartCtx, {
    type: 'pie',
    data: {
        labels: ['Admissions', 'Fee Structure', 'Infrastructure', 'Faculty', 'Scholarships', 'Curriculum'],
        datasets: [{
            data: [25, 20, 18, 15, 12, 10],
            backgroundColor: [
                '#66CDAA',  // Mint green for Admissions
                '#87CEEB',  // Sky blue for Fee Structure
                '#FFD700',  // Gold for Infrastructure
                '#FFA07A',  // Light salmon for Faculty
                '#DDA0DD',  // Plum for Scholarships
                '#FF9999'   // Light coral for Curriculum
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'RTI Applications by Category (%)',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

// Monthly Applications Line Chart
const applicationsChartCtx = document.getElementById('applicationsChart').getContext('2d');
new Chart(applicationsChartCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'RTI Applications Filed',
            data: [1500, 1800, 2200, 2400, 2100, 2800, 3000, 2900, 3200, 3400, 3600, 3800],
            borderColor: '#cb6b37',
            backgroundColor: 'rgba(203, 107, 55, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly RTI Applications (2025)',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Success Rate Chart
const successRateChartCtx = document.getElementById('successRateChart').getContext('2d');
new Chart(successRateChartCtx, {
    type: 'bar',
    data: {
        labels: ['Admissions', 'Fee Structure', 'Infrastructure', 'Faculty', 'Scholarships', 'Curriculum'],
        datasets: [{
            label: 'Success Rate',
            data: [85, 78, 72, 80, 75, 70],
            backgroundColor: [
                '#66CDAA',
                '#87CEEB',
                '#FFD700',
                '#FFA07A',
                '#DDA0DD',
                '#FF9999'
            ],
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'RTI Success Rate by Category (%)',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Add event listeners for filter changes
document.getElementById('year-filter').addEventListener('change', updateCharts);
document.getElementById('region-filter').addEventListener('change', updateCharts);
document.getElementById('refreshStats').addEventListener('click', refreshData);

function updateCharts() {
    // Simulate data update
    if (applicationsChart) {
        applicationsChart.data.datasets[0].data = applicationsChart.data.datasets[0].data.map(
            value => value * (0.9 + Math.random() * 0.2)
        );
        applicationsChart.update();
    }

    if (successRateChart) {
        successRateChart.data.datasets[0].data = successRateChart.data.datasets[0].data.map(
            value => Math.min(100, value * (0.9 + Math.random() * 0.2))
        );
        successRateChart.update();
    }

    if (statusChart) {
        statusChart.data.datasets[0].data = statusChart.data.datasets[0].data.map(
            value => value * (0.9 + Math.random() * 0.2)
        );
        statusChart.update();
    }

    // Animate refresh button
    refreshBtn.querySelector('i').style.transform = 'rotate(360deg)';
    setTimeout(() => {
        refreshBtn.querySelector('i').style.transform = 'rotate(0)';
    }, 500);
}

function refreshData() {
    // Add logic to refresh data
    console.log('Refreshing data...');
}

// RTI Tools & Templates Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Tool cards hover effects
    const toolCards = document.querySelectorAll('.tool-card');
    if (toolCards.length) {
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // Success Stories Tab Functionality
    const storyTabs = document.querySelectorAll('.story-tab');
    const storyCategories = document.querySelectorAll('.story-category');
    
    if (storyTabs.length && storyCategories.length) {
        storyTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                storyTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all story categories
                storyCategories.forEach(category => category.classList.remove('active'));
                
                // Show the selected category
                const targetCategory = document.getElementById(this.dataset.target);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }
    
    // Policy Tracker Tab Functionality
    const trackerTabs = document.querySelectorAll('.tracker-tab');
    const trackerPanels = document.querySelectorAll('.tracker-panel');
    
    if (trackerTabs.length && trackerPanels.length) {
        trackerTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                trackerTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all panels
                trackerPanels.forEach(panel => panel.classList.remove('active'));
                
                // Show the selected panel
                const targetPanel = document.getElementById(this.dataset.target);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // Interactive Learning Resources - Video Preview
    const videoResources = document.querySelectorAll('.video-resource');
    if (videoResources.length) {
        videoResources.forEach(resource => {
            const playButton = resource.querySelector('.play-button');
            if (playButton) {
                playButton.addEventListener('click', function() {
                    const videoLink = resource.querySelector('.resource-link');
                    if (videoLink) {
                        window.location.href = videoLink.getAttribute('href');
                    }
                });
            }
        });
    }
    
    // Quiz Card Interactions
    const quizCards = document.querySelectorAll('.quiz-card');
    if (quizCards.length) {
        quizCards.forEach(card => {
            const startButton = card.querySelector('.start-quiz-btn');
            if (startButton) {
                startButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Add quiz start functionality here
                    // For now, just redirect to the quiz page
                    window.location.href = this.getAttribute('href');
                });
            }
        });
    }
    
    // Institution Directory Search Functionality
    const directorySearchForm = document.querySelector('.search-form');
    if (directorySearchForm) {
        directorySearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would perform a search
            // For now, we'll just redirect to the directory index page
            window.location.href = 'directory/index.html';
        });
        
        // Quick filters
        const quickFilters = document.querySelectorAll('.quick-filter');
        if (quickFilters.length) {
            quickFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Toggle active state
                    this.classList.toggle('active');
                    // In a real implementation, this would apply the filter
                });
            });
        }
    }
    
    // Newsletter Subscription Form
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would submit the form
            // For now, we'll just show an alert
            alert('Thank you for subscribing to RTI Education updates!');
            this.reset();
        });
    }
});

// Webinar Tab Functionality
function initializeWebinarTabs() {
    const tabs = document.querySelectorAll('.webinar-tab');
    const upcomingSection = document.getElementById('upcoming-webinars');
    const recordedSection = document.getElementById('recorded-webinars');

    if (!tabs.length) return; // Exit if not on webinars page

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Show/hide appropriate section
            if (tab.dataset.target === 'upcoming') {
                upcomingSection.style.display = 'block';
                recordedSection.style.display = 'none';
            } else {
                upcomingSection.style.display = 'none';
                recordedSection.style.display = 'block';
            }
        });
    });
}

// Add webinar initialization to document ready
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    initializeWebinarTabs();
}); 