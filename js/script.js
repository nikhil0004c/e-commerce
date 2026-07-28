// Load cart when page opens
let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function addToCart(name, price) {

    // Check if product already exists
    let product = cart.find(item => item.name === name);

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    alert(name + " added to cart!");
}

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    document.getElementById("cart-count").textContent = totalItems;
}