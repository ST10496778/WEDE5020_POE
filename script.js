// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Initialize all functionality
    initLightbox();
    initSearch();
    initFormValidation();
    initMap();
});

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightbox || !lightboxImg) return;
    
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
    
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
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
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        });
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (!query) {
        searchResults.innerHTML = '<p>Please enter a search term</p>';
        return;
    }
    
    // Simulate search results
    const results = [
        { title: 'Female Hoodie', page: 'products.html', description: 'Beautiful homemade hoodie for females' },
        { title: 'Jesus Paid It All Hoodie', page: 'products.html', description: 'Inspirational hoodie with scripture' },
        { title: 'Our Mission', page: 'about_us.html', description: 'Learn about our mission and values' }
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

// Google Maps functionality
function initMap() {
    const mapContainer = document.getElementById('google-map');
    if (!mapContainer) return;
    
    // Simple Google Maps embed
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
                // Show success message
                e.preventDefault();
                showFormSuccess(this);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

function showFormSuccess(form) {
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

// Shopping cart functionality
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    if (!cartElement) return;
    
    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Your cart is empty</p>';
    } else {
        let total = 0;
        let cartHTML = '<ul>';
        cart.forEach(item => {
            cartHTML += `<li>${item.name} - R${item.price}</li>`;
            total += item.price;
        });
        cartHTML += `</ul><p><strong>Total: R${total}</strong></p>`;
        cartElement.innerHTML = cartHTML;
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout... This would redirect to payment in a real implementation.');
}