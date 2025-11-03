// Enhanced Website Features JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedFeatures();
});

function initializeEnhancedFeatures() {
    // Back to Top Button
    initBackToTop();
    // index box 
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initFloatingBoxes();
});
    // Reading Progress Bar
    initReadingProgress();
    
    // Mobile Navigation
    initMobileMenu();
    
    // Search Overlay
    initSearchOverlay();
    
    // Testimonial Carousel
    initTestimonialCarousel();
    
    // Newsletter Popup
    initNewsletterPopup();
    
    // Staggered Animations
    initStaggerAnimations();
    
    // Product Quick View
    initQuickView();
    
    // Countdown Timer
    initCountdownTimer();
    
    // Social Proof Counter
    initSocialProof();
}

// Back to Top Functionality
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
   floatingBoxes.forEach(box => {
        box.addEventListener('click', function() {
            floatingBoxes.forEach(b => b.classList.remove('active'));
                 this.classList.add('active');
    } )
    })
    
// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    const header = document.querySelector('header .header-content');
    if (header) {
        header.appendChild(mobileMenuBtn);
        
        const nav = document.querySelector('nav ul');
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
}

// Search Overlay
function initSearchOverlay() {
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-overlay-content">
            <button class="search-overlay-close" aria-label="Close search">×</button>
            <h3>Search Our Site</h3>
            <div class="search-box">
                <input type="search" placeholder="What are you looking for?" id="overlay-search">
                <button type="submit">Search</button>
            </div>
        </div>
    `;
    document.body.appendChild(searchOverlay);

    
    

    // Close search overlay
    document.querySelector('.search-overlay-close').addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const carousels = document.querySelectorAll('.testimonial-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const nextBtn = carousel.querySelector('.carousel-next');
        const prevBtn = carousel.querySelector('.carousel-prev');
        let currentSlide = 0;

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            track.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        }

        // Auto-advance carousel
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
}

// Newsletter Popup
function initNewsletterPopup() {
    // Only show if not shown before
    if (localStorage.getItem('newsletterShown')) return;

    setTimeout(() => {
        const popup = document.createElement('div');
        popup.className = 'newsletter-popup';
        popup.innerHTML = `
            <button class="newsletter-close" aria-label="Close newsletter">×</button>
            <h3>Join Our Faith Family</h3>
            <p>Subscribe to get weekly devotionals, exclusive offers, and community updates.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Your email address" required>
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
        `;
        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add('show'), 1000);

        document.querySelector('.newsletter-close').addEventListener('click', function() {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
            localStorage.setItem('newsletterShown', 'true');
        });

        popup.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing!', 'success');
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
            localStorage.setItem('newsletterShown', 'true');
        });
    }, 3000);
}

// Staggered Animations
function initStaggerAnimations() {
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('stagger-item');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerItems.forEach(item => observer.observe(item));
}

// Quick View for Products
function initQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view-btn')) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            showQuickViewModal(productName, productPrice, productImage);
        }
    });
}

function showQuickViewModal(name, price, image) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">×</button>
            <div class="modal-body">
                <img src="${image}" alt="${name}">
                <div class="modal-info">
                    <h3>${name}</h3>
                    <div class="price">${price}</div>
                    <p>Product description and details would go here...</p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Countdown Timer
function initCountdownTimer() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 90); // 90 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = '<div class="countdown-ended">Sale Ended!</div>';
        }
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown();
}


// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span>${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    return icons[type] || icons.info;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
 const title = this.querySelector('h3').textContent;
            showNotification(`Learn more about: ${title}`, 'info');



// Export for global use
window.showNotification = showNotification;