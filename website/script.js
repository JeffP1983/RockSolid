// Rock Solid Redevelopment - JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Testimonials Carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Form Validation and Submission
    const heroForm = document.getElementById('heroForm');
    const contactForm = document.getElementById('contactForm');

    // Phone number formatting
    function formatPhoneNumber(input) {
        const cleaned = input.value.replace(/\D/g, '');
        let formatted = '';

        if (cleaned.length > 0) {
            if (cleaned.length <= 3) {
                formatted = `(${cleaned}`;
            } else if (cleaned.length <= 6) {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
            } else {
                formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
            }
        }

        input.value = formatted;
    }

    // Add phone formatting to all phone inputs
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });

    // ZIP code validation
    document.querySelectorAll('input[name="zip"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 5);
        });
    });

    // Form validation function
    function validateForm(form) {
        const formData = new FormData(form);
        let isValid = true;
        let errors = [];

        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E52D27';
                errors.push(`${field.placeholder || field.name} is required`);
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#E52D27';
                errors.push('Please enter a valid email address');
            }
        }

        // Phone validation
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            const phoneDigits = phoneField.value.replace(/\D/g, '');
            if (phoneDigits.length !== 10) {
                isValid = false;
                phoneField.style.borderColor = '#E52D27';
                errors.push('Please enter a valid 10-digit phone number');
            }
        }

        // ZIP code validation
        const zipField = form.querySelector('input[name="zip"]');
        if (zipField && zipField.value) {
            if (zipField.value.length !== 5) {
                isValid = false;
                zipField.style.borderColor = '#E52D27';
                errors.push('Please enter a valid 5-digit ZIP code');
            }
        }

        // Consent checkbox validation
        const consentCheckbox = form.querySelector('input[type="checkbox"][name="consent"]');
        if (consentCheckbox && !consentCheckbox.checked) {
            isValid = false;
            errors.push('You must agree to the Terms & Conditions and Privacy Policy');
        }

        return { isValid, errors };
    }

    // Form submission handler
    function handleFormSubmit(e, form, messageElementId) {
        e.preventDefault();

        const validation = validateForm(form);
        const messageElement = document.getElementById(messageElementId);

        if (!validation.isValid) {
            messageElement.textContent = validation.errors[0];
            messageElement.className = 'form-message error';

            // Scroll to first error
            const firstError = form.querySelector('[style*="border-color: rgb(229, 45, 39)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== 'consent') {
                data[key] = value;
            }
        });

        // Here you would typically send the data to your server or CRM
        console.log('Form submitted with data:', data);

        // For demonstration, we'll show a success message
        // In production, you would make an API call here:
        // Example:
        // fetch('/api/submit-lead', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     // Handle success
        // })
        // .catch(error => {
        //     // Handle error
        // });

        // Simulate API call with timeout
        messageElement.textContent = 'Submitting...';
        messageElement.className = 'form-message';
        messageElement.style.display = 'block';
        messageElement.style.backgroundColor = '#666';

        setTimeout(() => {
            messageElement.textContent = 'Thank you! We\'ll contact you shortly.';
            messageElement.className = 'form-message success';

            // Reset form
            form.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }, 1000);
    }

    // Attach form submission handlers
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, heroForm, 'heroFormMessage');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, contactForm, 'contactFormMessage');
        });
    }

    // Remove error styling on input
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.process-card, .advantage-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Google Analytics (Placeholder - Add your GA tracking ID)
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');
