// Modern Portfolio JavaScript with Enhanced Interactivity

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.bindEvents();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle - Fixed version
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.mobile-nav-overlay');
    const navClose = document.querySelector('.mobile-nav-close');
    
    console.log('Nav elements found:', { navToggle, navMenu, navClose }); // Debug log
    
    // Backup method - ensure elements exist with retry
    if (!navToggle || !navMenu) {
        setTimeout(() => {
            const retryNavToggle = document.querySelector('.nav-toggle');
            const retryNavMenu = document.querySelector('.mobile-nav-overlay');
            if (retryNavToggle && retryNavMenu) {
                initMobileNav(retryNavToggle, retryNavMenu);
            }
        }, 500);
    }
    
    if (navToggle && navMenu) {
        initMobileNav(navToggle, navMenu);
    }
    
    function initMobileNav(toggle, menu) {
        const closeBtn = document.querySelector('.mobile-nav-close');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menu.classList.contains('active');
            
            // Toggle menu
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            toggle.setAttribute('aria-expanded', !isActive);
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
            
            console.log('Menu toggled, active:', !isActive); // Debug log
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });

        // Close button functionality
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // Scroll progress bar
    const updateScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    };

    window.addEventListener('scroll', updateScrollProgress);

    // Active navigation highlighting for new navbar
    const updateActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavigation);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);

    // Resume download function
    window.downloadResume = function() {
        // Download actual resume file
        const link = document.createElement('a');
        link.href = './docs/DIPAK SHARMA RESUME.pdf'; // Path to your resume file
        link.download = 'Dipak_Sharma_Resume'; // Name for downloaded file
        link.target = '_blank'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Newsletter subscription function
    window.handleNewsletterSubmit = function(event) {
        event.preventDefault();
        const emailInput = event.target.querySelector('.newsletter-input');
        const submitButton = event.target.querySelector('.newsletter-btn');
        
        if (emailInput && submitButton) {
            const email = emailInput.value;
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call (replace with actual newsletter service)
            setTimeout(() => {
                // Show success message
                submitButton.textContent = 'Subscribed!';
                submitButton.style.background = 'var(--secondary-color)';
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = 'var(--gradient-primary)';
                }, 3000);
                
                // You can add actual newsletter service integration here
                console.log('Newsletter subscription for:', email);
            }, 1500);
        }
    };

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('header');
    const handleScroll = debounce(() => {
        // Ensure header stays fixed
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '1000';
        header.style.width = '100%';
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
    
    // FORCE FIXED HEADER - Override everything
    if (header) {
        const forceFixedHeader = () => {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '99999';
            header.style.width = '100%';
            header.style.transform = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        };
        
        // Apply immediately
        forceFixedHeader();
        
        // Force it every 100ms to override any interference
        setInterval(forceFixedHeader, 100);
        
        // Also force on scroll
        window.addEventListener('scroll', forceFixedHeader);
        window.addEventListener('resize', forceFixedHeader);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-content, .achievement-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Animated number counters
    function animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Simple name animation that's reliable
    const animatedName = document.getElementById('animated-name');
    if (animatedName) {
        // Ensure name is visible immediately
        animatedName.style.opacity = '1';
        animatedName.style.color = 'var(--primary-color)';
        
        // Add entrance animation
        animatedName.style.transform = 'translateY(20px)';
        animatedName.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            animatedName.style.transform = 'translateY(0)';
        }, 500);
    }

    // Typing effect for the tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 2200); // Start after name animation
    }

    // Skill category hover effects
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project card interactive effects
    document.querySelectorAll('.project-card').forEach(card => {
        const projectInfo = card.querySelector('.project-info');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            if (projectInfo) {
                projectInfo.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            if (projectInfo) {
                projectInfo.style.transform = 'translateY(0)';
            }
        });

        // Add ripple effect to tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    });

    // Enhanced button interactions
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social links hover effects
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Subtle parallax effect for hero image (reduced)
    const heroImage = document.querySelector('#item2-image');
    if (heroImage) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.05; // Reduced parallax effect
            if (scrolled < window.innerHeight) { // Only apply within viewport
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
        }, 16));
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.lists a[href^="#"]');
    
    const highlightNavigation = debounce(() => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 50);
    
    window.addEventListener('scroll', highlightNavigation);

    // Loading animation for page
    const body = document.body;
    body.style.opacity = '0';
    body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        body.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        body.style.opacity = '1';
        body.style.transform = 'translateY(0)';
    }, 100);

    // Cursor trail effect (subtle)
    let trail = [];
    const trailLength = 5;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        if (trail.length > trailLength) {
            trail.shift();
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance optimization: Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Error handling for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            try {
                // Analytics tracking could go here
                console.log(`External link clicked: ${link.href}`);
            } catch (error) {
                console.warn('Analytics tracking failed:', error);
            }
        });
    });

    // Add focus indicators for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// CSS for additional animations (injected via JavaScript)
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .lists li a.active {
        color: var(--primary-color);
        background-color: var(--bg-secondary);
    }
    
    .lists li a.active::after {
        width: 80%;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #2563eb !important;
        outline-offset: 2px !important;
    }
    
    .skill-category li {
        transition: all 0.3s ease;
    }
    
    .skill-category li:hover {
        color: var(--primary-color);
        transform: translateX(5px);
    }
    
    .project-info {
        transition: transform 0.3s ease;
    }
    
    .social-icon {
        transition: transform 0.3s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);