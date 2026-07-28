let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayCart();

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const grandTotal = document.getElementById("grand-total");
    const totalItems = document.getElementById("total-items");

    cartItems.innerHTML = "";

    let total = 0;
    let items = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;
        items += product.quantity;

        cartItems.innerHTML += `
        <div class="cart-card">
            <h3>${product.name}</h3>

            <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>

            <div class="qty">
                <button onclick="decrease(${index})">-</button>
                <span>${product.quantity}</span>
                <button onclick="increase(${index})">+</button>
            </div>

            <p><strong>Total: ₹${(product.price * product.quantity).toLocaleString("en-IN")}</strong></p>

            <button class="remove-btn" onclick="removeItem(${index})">
                Remove
            </button>
        </div>
        `;
    });

    totalItems.textContent = items;
    grandTotal.textContent = "₹" + total.toLocaleString("en-IN");

    localStorage.setItem("cart", JSON.stringify(cart));
}

function increase(index) {
    cart[index].quantity++;
    displayCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}