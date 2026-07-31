// ==========================
// CART.JS
// ==========================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --------------------------
// Add Product to Cart
// --------------------------

function addCart(id) {

    let product = products.find(p => p.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");

}

// --------------------------
// Update Cart Count
// --------------------------

function updateCartCount() {

    let count = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = count;
    }

}

// --------------------------
// Display Cart
// --------------------------

function displayCart() {

    let container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML = "<h2>Your cart is empty.</h2>";

        let grand = document.getElementById("grand-total");

        if (grand) grand.innerText = "₹0";

        return;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        container.innerHTML += `

        <div class="product-card">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>₹${item.price.toLocaleString('en-IN')}</p>

            <p>Quantity : ${item.quantity}</p>

            <button onclick="increaseQty(${index})">+</button>

            <button onclick="decreaseQty(${index})">-</button>

            <button onclick="removeItem(${index})">Remove</button>

        </div>

        `;

    });

    let grand = document.getElementById("grand-total");

    if (grand) {
        grand.innerText = "₹" + total.toLocaleString('en-IN');
    }

}

// --------------------------
// Increase Quantity
// --------------------------

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();

}

// --------------------------
// Decrease Quantity
// --------------------------

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}

// --------------------------
// Remove Product
// --------------------------

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}

// --------------------------
// Save Cart
// --------------------------

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}

// --------------------------
// Initial Load
// --------------------------

updateCartCount();

displayCart();