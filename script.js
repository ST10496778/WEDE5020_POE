//  validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
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

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const results = document.getElementById('search-results');
    
    if (!searchTerm) {
        results.innerHTML = '<p>Please enter a search term</p>';
        return;
    }

    // Simple search simulation
    const products = ['Hoodie', 'T-Shirt', 'Jesus Paid It All', 'Faith Design'];
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

// Shopping cart
let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
    alert(`${product} added to cart!`);
}

function updateCart() {
    const cartElement = document.getElementById('cart-items');
    if (!cartElement) return;

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Cart is empty</p>';
    } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartElement.innerHTML = `
            <ul>
                ${cart.map(item => `<li>${item.product} - R${item.price}</li>`).join('')}
            </ul>
            <p><strong>Total: R${total}</strong></p>
        `;
    }
}

function clearCart() {
    cart = [];
    updateCart();
}

// Initialize map
function initMap() {
    const mapContainer = document.getElementById('google-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.123456789012!2d28.047305!3d-26.204103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1c1c1c1c1c%3A0x1234567890abcdef!2sJohannesburg!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza" 
                width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    
    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this.id)) {
                e.preventDefault();
            }
        });
    });
});