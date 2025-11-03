// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('header nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize Google Map
    initMap();
});

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Get all gallery images
    document.querySelectorAll('.gallery-item img, .product-card img').forEach((img, index) => {
        images.push({
            src: img.src,
            alt: img.alt
        });
        
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }
    
    // Close lightbox on outside click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

// Search functionality
function initSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        });
        
        // Real-time search (optional)
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                performSearch(this.value.trim());
            } else {
                clearSearchResults();
            }
        });
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (!query) {
        clearSearchResults();
        return;
    }
    
    // Simulate search results
    const results = [
        { title: 'Female Hoodie', page: 'products.html', description: 'Beautiful homemade hoodie for females' },
        { title: 'Jesus Paid It All Hoodie', page: 'products.html', description: 'Inspirational hoodie with scripture' },
        { title: 'Our Mission', page: 'about_us.html', description: 'Learn about our mission and values' },
        { title: 'Testimonies', page: 'faith_comunity.html', description: 'Read inspiring stories from our community' },
        { title: 'Contact Us', page: 'contact_us.html', description: 'Get in touch with our team' }
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found. Try different keywords.</p>';
        return;
    }
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-item';
        resultItem.innerHTML = `
            <h4><a href="${result.page}">${result.title}</a></h4>
            <p>${result.description}</p>
        `;
        searchResults.appendChild(resultItem);
    });
}

function clearSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '';
    }
}

// Google Maps functionality
function initMap() {
    const mapContainer = document.getElementById('google-map');
    if (!mapContainer) return;
    
    // Google Maps embed code
    const mapEmbed = `
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.123456789012!2d28.047305!3d-26.204103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1c1c1c1c1c%3A0x1234567890abcdef!2sJohannesburg!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza" 
            width="100%" 
            height="400" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            title="Our Location in Johannesburg">
        </iframe>
    `;
    
    mapContainer.innerHTML = mapEmbed;
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            } else {
                // Simulate form submission success
                e.preventDefault();
                showFormSuccess(this);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    
    let errorElement = field.parentNode.querySelector('.error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(field) {
    field.style.borderColor = '#ddd';
    
    const errorElement = field.parentNode.querySelector('.error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showFormSuccess(form) {
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 12px;
        border-radius: 6px;
        margin: 15px 0;
        border: 1px solid #c3e6cb;
    `;
    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    
    form.parentNode.insertBefore(successMessage, form);
    
    // Clear form after successful submission
    setTimeout(() => {
        form.reset();
        successMessage.remove();
    }, 5000);
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Hide all testimonials except first
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
}

// Initialize testimonial slider if on faith community page
if (window.location.pathname.includes('faith_comunity.html')) {
    document.addEventListener('DOMContentLoaded', initTestimonialSlider);
}