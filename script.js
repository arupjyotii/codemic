// ===================================
// WELCOME MODAL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcomeModal');
    const closeModal = document.getElementById('closeModal');
    
    // Show modal on page load
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 300);
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    });
});

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
const lazyImages = document.querySelectorAll('.lazy-load');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// REVIEWS CAROUSEL
// ===================================
const reviewsCarousel = document.querySelector('.reviews-carousel');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Auto-scroll carousel
const autoScroll = () => {
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length === 0) return;
    
    currentSlide = (currentSlide + 1) % reviewCards.length;
    
    const scrollAmount = reviewCards[currentSlide].offsetLeft - 
                        (reviewsCarousel.offsetWidth - reviewCards[currentSlide].offsetWidth) / 2;
    
    reviewsCarousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    updateDots();
};

// Update active dot
const updateDots = () => {
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

// Dot click handler
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        const reviewCards = document.querySelectorAll('.review-card');
        const scrollAmount = reviewCards[currentSlide].offsetLeft - 
                            (reviewsCarousel.offsetWidth - reviewCards[currentSlide].offsetWidth) / 2;
        
        reviewsCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        updateDots();
    });
});

// Start auto-scroll
let carouselInterval = setInterval(autoScroll, 5000);

// Pause auto-scroll on hover
reviewsCarousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

reviewsCarousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(autoScroll, 5000);
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Animate sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    animateOnScroll.observe(section);
});

// Animate service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// Animate work cards
const workCards = document.querySelectorAll('.work-card');
workCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations can be added here
    });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// PRELOAD CRITICAL RESOURCES
// ===================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Preload images for better performance
    const imagesToPreload = [
        'assets/project1.jpg',
        'assets/project2.jpg',
        'assets/project3.jpg',
        'assets/project4.jpg',
        'assets/project5.jpg'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && document.activeElement.closest('.reviews-carousel')) {
        currentSlide = (currentSlide - 1 + dots.length) % dots.length;
        dots[currentSlide].click();
    } else if (e.key === 'ArrowRight' && document.activeElement.closest('.reviews-carousel')) {
        currentSlide = (currentSlide + 1) % dots.length;
        dots[currentSlide].click();
    }
});

// Focus trap for modal
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.getElementById('welcomeModal');

modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('closeModal').click();
    }
    
    if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

console.log('%c🚀 Codemic Co. - Built with passion!', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
