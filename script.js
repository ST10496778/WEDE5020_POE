// script.js - WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');
    
    // Basic functionality
    initMobileMenu();
    initSearch();
    initImageLightbox();
    initCart();
});

// Mobile Menu
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav ul');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}

// Search Functionality
function initSearch() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                alert('Search for: ' + searchInput.value);
            }
        });
    }
}

// Image Lightbox
function initImageLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (lightbox && lightboxImg) {
        // Open lightbox when gallery images are clicked
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.style.display = 'flex';
            });
        });
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
            });
        }
        
        // Close when clicking outside image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
}

// Shopping Cart
function initCart() {
    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-amount');
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Add to cart
            cart.push({
                name: productName,
                price: parseFloat(productPrice.replace('R', ''))
            });
            
            updateCartDisplay();
            alert(productName + ' added to cart!');
        });
    });
    
    function updateCartDisplay() {
        if (cartItems && cartTotal) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
                cartTotal.textContent = '0';
            } else {
                let total = 0;
                cartItems.innerHTML = '';
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <span>${item.name}</span>
                        <span>R${item.price}</span>
                    `;
                    cartItems.appendChild(cartItem);
                    total += item.price;
                });
                
                cartTotal.textContent = total;
            }
        }
    }
    
    // Clear cart
    const clearCartBtn = document.querySelector('.cart-actions .btn:first-child');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            cart = [];
            updateCartDisplay();
        });
    }
    
    // Checkout
    const checkoutBtn = document.querySelector('.cart-actions .btn-primary');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                alert('Proceeding to checkout with ' + cart.length + ' items!');
            }
        });
    }
}

// Simple notification system
function showNotification(message) {
    alert(message); // Simple alert for now
}

// Make functions globally available
window.addToCart = function(product, price) {
    showNotification(product + ' added to cart! Price: R' + price);
};

window.clearCart = function() {
    showNotification('Cart cleared!');
};

window.checkout = function() {
    showNotification('Proceeding to checkout!');
};