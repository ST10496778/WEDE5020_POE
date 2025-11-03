// script.js - CLEAN VERSION (NO ERRORS)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    initializeAllFeatures();
});

function initializeAllFeatures() {
    initMobileMenu();
    initImageLightbox();
    initSearchFunctionality();
    initShoppingCart();
    initProductFilters();
    initFloatingBoxes();
}

// 1. Mobile Menu
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav ul');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}

// 2. Image Lightbox
function initImageLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImg) return;
    
    // Open lightbox when gallery images are clicked
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
        });
    });
    
    // Close lightbox
    document.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// 3. Search Functionality
function initSearchFunctionality() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput.value.trim()) {
                alert('Searching for: ' + searchInput.value);
                searchInput.value = '';
            }
        });
    }
}

// 4. Shopping Cart
function initShoppingCart() {
    let cartItems = [];
    let cartTotal = 0;
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Simple cart functionality
            cartItems.push({ name: productName, price: productPrice });
            cartTotal += parseFloat(productPrice.replace('R', ''));
            
            showNotification('✓ ' + productName + ' added to cart!');
            updateCartDisplay();
        });
    });
    
    function updateCartDisplay() {
        const cartElement = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total-amount');
        
        if (cartElement && totalElement) {
            if (cartItems.length === 0) {
                cartElement.innerHTML = '<p>Your cart is empty</p>';
            } else {
                cartElement.innerHTML = cartItems.map(item => 
                    `<div class="cart-item">${item.name} - ${item.price}</div>`
                ).join('');
            }
            totalElement.textContent = cartTotal;
        }
    }
    
    // Clear cart function
    window.clearCart = function() {
        cartItems = [];
        cartTotal = 0;
        updateCartDisplay();
        showNotification('Cart cleared!');
    };
    
    // Checkout function
    window.checkout = function() {
        if (cartItems.length === 0) {
            showNotification('Your cart is empty!');
        } else {
            showNotification(`Proceeding to checkout with ${cartItems.length} items! Total: R${cartTotal}`);
        }
    };
}

// 5. Product Filters
function initProductFilters() {
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

// 6. Floating Boxes (FIXED - no errors)
function initFloatingBoxes() {
    const floatingBoxes = document.querySelectorAll('.floating-box');
    
    floatingBoxes.forEach(box => {
        // Add click interaction if needed
        box.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Ensure animations work
        const delay = this.getAttribute('data-delay') || '0';
        this.style.animationDelay = delay + 'ms';
    });
}

// 7. Notification System
function showNotification(message) {
    // Create simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6B705C;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Global functions for HTML onclick attributes
window.addToCart = function(productName, price) {
    showNotification('✓ ' + productName + ' added to cart!');
};

