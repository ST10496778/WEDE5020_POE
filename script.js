// Shopping Cart Functionality
let cart = [];

function addToCart(product, price) {
    const sizeDropdown = event.target.closest('.product-card').querySelector('.size-dropdown');
    const selectedSize = sizeDropdown ? sizeDropdown.value : '';
    
    if (!selectedSize) {
        alert('Please select a size before adding to cart.');
        return;
    }
    
    cart.push({ 
        product: product, 
        price: price,
        size: selectedSize
    });
    updateCart();
    showNotification(`${product} (Size: ${selectedSize}) added to cart!`, 'success');
}

function updateCart() {
    const cartElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total-amount');
    
    if (!cartElement) return;

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '0';
    } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartElement.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.product}</strong><br>
                    <small>Size: ${item.size} | R${item.price}</small>
                </div>
                <button onclick="removeFromCart('${item.product}-${item.size}')">×</button>
            </div>
        `).join('');
        
        if (totalElement) totalElement.textContent = total;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => `${item.product}-${item.size}` !== productId);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderDetails = cart.map(item => 
        `${item.product} (Size: ${item.size}) - R${item.price}`
    ).join('\n');
    
    alert(`Order Summary:\n\n${orderDetails}\n\nTotal: R${total}\n\nProceeding to checkout...`);
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const error = input.nextElementSibling;
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            if (error && error.classList.contains('error')) {
                error.textContent = 'This field is required';
                error.style.display = 'block';
            }
        } else {
            input.style.borderColor = '#ddd';
            if (error && error.classList.contains('error')) {
                error.style.display = 'none';
            }
        }
    });

    return isValid;
}

// Search Functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const results = document.getElementById('search-results');
    
    if (!searchTerm) {
        results.innerHTML = '<p>Please enter a search term</p>';
        return;
    }

    // Simple search simulation
    const products = ['Hoodie', 'T-Shirt', 'Jesus Paid It All', 'Faith Design', 'Dress', 'Accessories'];
    const filtered = products.filter(product => 
        product.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        results.innerHTML = '<p>No products found</p>';
    } else {
        results.innerHTML = '<ul>' + filtered.map(item => 
            `<li><a href="products.html">${item}</a></li>`
        ).join('') + '</ul>';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
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

// Back to Top Button
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

// Product Category Filtering
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide products based on category
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Size Selection Validation
function initSizeValidation() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const sizeDropdown = this.closest('.product-card').querySelector('.size-dropdown');
            if (!sizeDropdown.value) {
                e.preventDefault();
                alert('Please select a size before adding to cart.');
                sizeDropdown.focus();
            }
        });
    });
}

// Google Maps Integration
function initMap() {
    const mapContainer = document.getElementById('google-map');
    if (!mapContainer) return;
    
    const mapEmbed = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.2493644902365!2d27.967868909541018!3d-26.02539575661768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95766215d13b37%3A0xd50e033e1dec0d76!2s15%20Arniston%20Pl%2C%20Bloubosrand%2C%20Randburg%2C%202188!5e0!3m2!1sen!2sza!4v1762183101590!5m2!1sen!2sza" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                
    `;
    
    mapContainer.innerHTML = mapEmbed;
}

// Floating Boxes Animation
function initFloatingBoxes() {
    const floatingBoxes = document.querySelectorAll('.floating-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.animation = `floatIn 0.8s ease forwards`;
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    floatingBoxes.forEach(box => observer.observe(box));
}

// Character Counter for Forms
function initCharacterCounters() {
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const prayerField = document.getElementById('prayer-request');
    const prayerCharCounter = document.getElementById('prayer-char-counter');

    function setupCharCounter(field, counter) {
        if (!field || !counter) return;
        
        field.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = length;
            
            if (length > (field.id === 'prayer-request' ? 1000 : 500)) {
                counter.style.color = 'var(--rust)';
                counter.style.fontWeight = 'bold';
            } else if (length > (field.id === 'prayer-request' ? 800 : 400)) {
                counter.style.color = 'var(--clay)';
            } else {
                counter.style.color = 'var(--taupe)';
            }
        });
    }

    setupCharCounter(messageField, charCounter);
    setupCharCounter(prayerField, prayerCharCounter);
}

// Prayer Button Functionality
function initPrayerButtons() {
    document.querySelectorAll('.pray-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentText = this.textContent;
            if (currentText === 'I Prayed 🙏') {
                this.textContent = 'Prayed ✅';
                this.style.background = 'var(--highlight)';
                this.disabled = true;
                
                showNotification('Thank you for praying!', 'success');
            }
        });
    });
}

// Form Submission Handlers
function initFormSubmissions() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-primary');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                const charCounter = document.getElementById('char-counter');
                if (charCounter) {
                    charCounter.textContent = '0';
                    charCounter.style.color = 'var(--taupe)';
                }
                
                // Reset button
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Prayer form
    const prayerForm = document.getElementById('prayer-request-form');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Your prayer request has been received and will be added to our prayer chain. Our community is praying with you.', 'success');
            this.reset();
            const prayerCharCounter = document.getElementById('prayer-char-counter');
            if (prayerCharCounter) {
                prayerCharCounter.textContent = '0';
                prayerCharCounter.style.color = 'var(--taupe)';
            }
        });
    }
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

// Initialize Everything When Page Loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Chosen Path - Website Loaded');
    
    // Initialize all functionality
    initBackToTop();
    initReadingProgress();
    initMobileMenu();
    initCategoryFilter();
    initSizeValidation();
    initMap();
    initFloatingBoxes();
    initCharacterCounters();
    initPrayerButtons();
    initFormSubmissions();
    initTestimonialCarousel();
    
    // Set current date for devotion section
    const currentDate = document.getElementById('current-date');
    if (currentDate) {
        currentDate.textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
});

// Utility Functions
function getDirections() {
    window.open('https://maps.google.com?q=123+Faith+Street+Johannesburg+2000+South+Africa', '_blank');
}

function openLiveChat() {
    showNotification('Live chat is available during business hours. Please call or email for immediate assistance.', 'info');
}

function joinWhatsApp() {
    alert('You will be redirected to join our WhatsApp community group. Welcome!');
}

function shareStory() {
    alert('Thank you for wanting to share your story! You will be redirected to our testimony submission form.');
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.checkout = checkout;
window.performSearch = performSearch;
window.showNotification = showNotification;
window.getDirections = getDirections;
window.openLiveChat = openLiveChat;
window.joinWhatsApp = joinWhatsApp;
window.shareStory = shareStory;