// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile nav...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) {
        console.error('Navigation elements not found!', { navToggle, navMenu });
        return;
    }

    console.log('Navigation elements found, adding click handler...');

    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger clicked!');
        
        navMenu.classList.toggle('active');
        console.log('Menu active class toggled, now:', navMenu.classList.contains('active'));
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? 45 : index === 1 ? 45 : -45}deg) translate(${index === 1 ? '0' : index === 0 ? '6px, 6px' : '6px, -6px'})`
                : 'none';
        });
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        });
    });
});

// Smooth Scrolling for Anchor Links
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

// Form Handling - with error checking
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.service) {
        showNotification('Por favor complete todos los campos obligatorios', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor ingrese un email válido', 'error');
        return;
    }

    // Phone validation (Paraguay format)
    const phoneRegex = /^(\+595|0)?[9][0-9]{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s+/g, ''))) {
        showNotification('Por favor ingrese un número de teléfono válido', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification('¡Solicitud enviada exitosamente! Nos comunicaremos contigo pronto.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#065f46' : type === 'error' ? '#7f1d1d' : '#7f1d1d'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#dc2626'};
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .service-featured-card, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.3s cubic-bezier(0, 0, 0.3, 1), transform 0.3s cubic-bezier(0, 0, 0.3, 1)';
        observer.observe(el);
    });
});

// Removed problematic parallax effect that was causing scroll bug

// Service Card Hover Effects - Removed for subtlety
// Card animations are now handled purely via CSS for better performance and subtlety

// Button Click Effects
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.4s cubic-bezier(0, 0, 0.3, 1);
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Add pulse animation for WhatsApp button
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }
        50% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 0 0 10px rgba(37, 211, 102, 0.1);
        }
        100% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Hero section button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Hero "Reservar ahora" button
    const heroReservarBtn = document.querySelector('.hero-buttons .btn-primary');
    if (heroReservarBtn) {
        heroReservarBtn.addEventListener('click', function() {
            const message = `Hola, me interesa el Servicio Premium Executive de Lavadero Boutique. ¿Podrían brindarme más información sobre horarios y precios?`;
            openWhatsApp(message);
        });
    }

    // Hero "Conocer más" button
    const heroConocerBtn = document.querySelector('.hero-buttons .btn-outline');
    if (heroConocerBtn) {
        heroConocerBtn.addEventListener('click', function() {
            document.querySelector('#servicios').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Service booking functionality for featured cards
    document.querySelectorAll('.service-featured-card .btn-primary').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const services = ['Lavado Premium Signature', 'Detailing Profesional', 'Servicio VIP Executive'];
            const service = services[index];
            const message = `Hola, me interesa reservar el servicio: ${service}. ¿Podrían brindarme más información sobre horarios y precios?`;
            openWhatsApp(message);
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        // Enhanced opacity when scrolled for better readability
        navbar.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
            url('carbon-fiber-custom.webp')`;
        navbar.style.backgroundSize = 'cover, 200px 200px';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        // Original carbon fiber pattern
        navbar.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
            url('carbon-fiber-custom.webp')`;
        navbar.style.backgroundSize = 'cover, 200px 200px';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

console.log('Lavadero Boutique - Website loaded successfully!'); 

// Parallax effect for background images
function initParallax() {
    const featuredServicesBg = document.querySelector('.featured-services-bg');
    const servicesBg = document.querySelector('.services-bg');
    
    if (!featuredServicesBg && !servicesBg) return;
    
    // Check if device prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable parallax on mobile or if user prefers reduced motion
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile || prefersReducedMotion) {
        if (featuredServicesBg) {
            featuredServicesBg.style.position = 'absolute';
            featuredServicesBg.style.height = '100%';
        }
        if (servicesBg) {
            servicesBg.style.position = 'absolute';
            servicesBg.style.height = '100%';
        }
        return;
    }
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (featuredServicesBg) {
            featuredServicesBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        if (servicesBg) {
            servicesBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', handleScroll);
            if (featuredServicesBg) {
                featuredServicesBg.style.position = 'absolute';
                featuredServicesBg.style.height = '100%';
                featuredServicesBg.style.transform = 'none';
            }
            if (servicesBg) {
                servicesBg.style.position = 'absolute';
                servicesBg.style.height = '100%';
                servicesBg.style.transform = 'none';
            }
        } else {
            window.addEventListener('scroll', handleScroll, { passive: true });
            if (featuredServicesBg) {
                featuredServicesBg.style.position = 'fixed';
                featuredServicesBg.style.height = '120%';
            }
            if (servicesBg) {
                servicesBg.style.position = 'fixed';
                servicesBg.style.height = '120%';
            }
        }
    });
}

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', initParallax);

// BentoGallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const bentoItems = document.querySelectorAll('.bento-item');
    
    if (!bentoItems.length) return; // Exit if bento gallery doesn't exist
    
    // Add click functionality for enhanced interaction
    bentoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Create a subtle click effect
            item.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
            
            // Optional: Add click tracking or navigation
            console.log(`Bento item ${index + 1} clicked`);
        });
        
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Add intersection observer for staggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const bentoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Initialize animation states and observe
    bentoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        bentoObserver.observe(item);
    });
}); 