// Contact Form JavaScript with Validation and Interactive Features

// Professional Contact Navbar Functionality
class ContactNavbar {
    constructor() {
        this.navbar = document.querySelector('.contact-navbar');
        this.mobileToggle = document.querySelector('.nav-toggle');
        this.mobileOverlay = document.querySelector('.mobile-nav-overlay');
        this.mobileClose = document.querySelector('.mobile-nav-close');
        this.scrollProgressBar = document.querySelector('.scroll-progress-bar');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateScrollProgress();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Mobile menu close button
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close mobile menu when clicking overlay
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Scroll progress bar
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
        });

        // Navbar scroll effects
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });

        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navbar.classList.contains('menu-open')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navbar.classList.toggle('menu-open');
        document.body.style.overflow = this.navbar.classList.contains('menu-open') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.navbar.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    updateScrollProgress() {
        if (!this.scrollProgressBar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        this.scrollProgressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
    }

    handleNavbarScroll() {
        if (!this.navbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Theme management (shared with main site)
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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Contact Navbar
    new ContactNavbar();
    
    // Initialize Theme Manager
    new ThemeManager();
    
    // Form elements
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const newsletter = document.getElementById('newsletter');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const formStatus = document.getElementById('formStatus');
    const charCount = document.getElementById('charCount');

    // Validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            messages: {
                required: 'First name is required',
                minLength: 'First name must be at least 2 characters',
                maxLength: 'First name cannot exceed 50 characters',
                pattern: 'First name can only contain letters and spaces'
            }
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            messages: {
                required: 'Last name is required',
                minLength: 'Last name must be at least 2 characters',
                maxLength: 'Last name cannot exceed 50 characters',
                pattern: 'Last name can only contain letters and spaces'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'Email address is required',
                pattern: 'Please enter a valid email address'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            messages: {
                required: 'Message is required',
                minLength: 'Message must be at least 10 characters',
                maxLength: 'Message cannot exceed 1000 characters'
            }
        }
    };

    // Utility functions
    function showError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        field.classList.add('error');
        field.classList.remove('success');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function showSuccess(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        field.classList.remove('error');
        field.classList.add('success');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    function clearValidation(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        field.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    function validateField(field) {
        const rules = validationRules[field.name];
        if (!rules) return true;

        const value = field.value.trim();

        // Required validation
        if (rules.required && !value) {
            showError(field, rules.messages.required);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value) {
            clearValidation(field);
            return true;
        }

        // Length validations
        if (rules.minLength && value.length < rules.minLength) {
            showError(field, rules.messages.minLength);
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            showError(field, rules.messages.maxLength);
            return false;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(field, rules.messages.pattern);
            return false;
        }

        showSuccess(field);
        return true;
    }

    function validateForm() {
        const fields = [firstName, lastName, email, message];
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function updateCharCount() {
        const length = message.value.length;
        const maxLength = 1000;
        charCount.textContent = length;
        
        const countElement = charCount.parentElement;
        countElement.classList.remove('warning', 'error');
        
        if (length > maxLength * 0.8) {
            countElement.classList.add('warning');
        }
        if (length > maxLength) {
            countElement.classList.add('error');
        }
    }

    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = `form-status show ${type}`;
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }

    function toggleSubmitButton(loading = false) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }

    // Simulate form submission (replace with actual backend integration)
    async function submitForm(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo purposes
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        if (isSuccess) {
            return { success: true, message: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.' };
        } else {
            throw new Error('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
        }
    }

    // Event listeners
    firstName.addEventListener('blur', () => validateField(firstName));
    firstName.addEventListener('input', () => {
        if (firstName.classList.contains('error')) {
            validateField(firstName);
        }
    });

    lastName.addEventListener('blur', () => validateField(lastName));
    lastName.addEventListener('input', () => {
        if (lastName.classList.contains('error')) {
            validateField(lastName);
        }
    });

    email.addEventListener('blur', () => validateField(email));
    email.addEventListener('input', () => {
        if (email.classList.contains('error')) {
            validateField(email);
        }
    });

    message.addEventListener('blur', () => validateField(message));
    message.addEventListener('input', () => {
        updateCharCount();
        if (message.classList.contains('error')) {
            validateField(message);
        }
    });

    // Character count initialization
    updateCharCount();

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous status
        formStatus.classList.remove('show');

        // Validate form
        if (!validateForm()) {
            showFormStatus('error', 'Please correct the errors above and try again.');
            return;
        }

        // Prepare form data
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            subject: subject.value,
            message: message.value.trim(),
            newsletter: newsletter.checked
        };

        try {
            toggleSubmitButton(true);
            
            const result = await submitForm(formData);
            
            if (result.success) {
                showFormStatus('success', result.message);
                form.reset();
                updateCharCount();
                
                // Clear all validation states
                [firstName, lastName, email, message].forEach(field => {
                    clearValidation(field);
                });
            }
        } catch (error) {
            showFormStatus('error', error.message);
        } finally {
            toggleSubmitButton(false);
        }
    });

    // Auto-resize textarea
    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    message.addEventListener('input', () => autoResize(message));

    // Add focus effects to form elements
    const formElements = form.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Smooth page load animation
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Enhanced contact method interactions
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Copy email to clipboard functionality
    const emailContact = document.querySelector('.contact-method .contact-details p');
    if (emailContact && emailContact.textContent.includes('@')) {
        emailContact.style.cursor = 'pointer';
        emailContact.title = 'Click to copy email address';
        
        emailContact.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText('dipaksharma.dev@gmail.com');
                
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Copied to clipboard!';
                this.style.color = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            } catch (err) {
                console.warn('Failed to copy email:', err);
            }
        });
    }

    // Initialize page animations
    const animatedElements = document.querySelectorAll('.contact-header, .form-section, .contact-info, .skills-highlight');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// CSS animations injected via JavaScript
const contactStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    body {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);