// Load cart from Local Storage
console.log("SCRIPT.JS LOADED");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
updateCartCount();

// Add product to cart
function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}

// Update cart count
function updateCartCount() {

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    document.getElementById("cart-count").textContent = total;
}

// Search products
function searchProducts() {

    const input = document.getElementById("search").value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(input)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

}
function filterProducts(category) {

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}