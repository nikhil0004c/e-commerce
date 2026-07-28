let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cart-items");
let grandTotal = document.getElementById("grand-total");

displayCart();

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let row = `
        <tr>
            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>${item.quantity}</td>

            <td>₹${item.price * item.quantity}</td>

            <td>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </td>
        </tr>
        `;

        cartItems.innerHTML += row;

        total += item.price * item.quantity;

    });

    grandTotal.innerHTML = "Grand Total : ₹" + total.toLocaleString("en-IN");
}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}