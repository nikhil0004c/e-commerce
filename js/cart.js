// ==========================================
// YONICk CART SYSTEM
// ==========================================


// ==========================================
// LOAD CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}


// ==========================================
// ADD PRODUCT
// ==========================================

function addCart(id) {

    const product = products.find(
        product => product.id === id
    );


    if (!product) {

        console.error("Product not found:", id);

        return;

    }


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();


    // Small notification instead of alert

    showCartMessage(
        product.name + " added to cart 🛒"
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = count;

    }

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const container =
        document.getElementById("cart-items");


    if (!container) return;


    container.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your Cart is Empty</h2>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <a href="index.html"
                   class="continue-shopping">

                    Continue Shopping

                </a>

            </div>

        `;


        updateSummary(0);

        return;

    }


    let subtotal = 0;


    // DISPLAY ITEMS

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        subtotal += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <!-- PRODUCT IMAGE -->

                <div class="cart-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="this.src='images/iphone.jpg'"
                    >

                </div>


                <!-- PRODUCT DETAILS -->

                <div class="cart-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="cart-category">
                        ${item.category}
                    </p>

                    <p class="cart-price">

                        ₹${item.price.toLocaleString("en-IN")}

                    </p>


                    <!-- QUANTITY -->

                    <div class="quantity-control">

                        <button
                            onclick="decreaseQty(${index})">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseQty(${index})">

                            +

                        </button>

                    </div>

                </div>


                <!-- TOTAL -->

                <div class="cart-item-total">

                    <strong>

                        ₹${itemTotal.toLocaleString("en-IN")}

                    </strong>


                    <button
                        class="remove-btn"
                        onclick="removeItem(${index})">

                        🗑 Remove

                    </button>

                </div>

            </div>

        `;

    });


    updateSummary(subtotal);

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQty(index) {

    if (!cart[index]) return;


    cart[index].quantity++;


    saveCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQty(index) {

    if (!cart[index]) return;


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index) {

    if (!cart[index]) return;


    const productName =
        cart[index].name;


    cart.splice(index, 1);


    saveCart();


    showCartMessage(
        productName + " removed from cart"
    );

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    if (cart.length === 0) return;


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) return;


    cart = [];


    saveCart();


    showCartMessage(
        "Cart cleared successfully"
    );

}


// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary(subtotal) {

    const subtotalElement =
        document.getElementById("subtotal");


    const deliveryElement =
        document.getElementById("delivery");


    const discountElement =
        document.getElementById("discount");


    const grandTotalElement =
        document.getElementById("grand-total");


    // FREE DELIVERY ABOVE ₹1000

    let delivery = 0;


    if (subtotal > 0 && subtotal < 1000) {

        delivery = 99;

    }


    // 10% DISCOUNT ABOVE ₹50,000

    let discount = 0;


    if (subtotal >= 50000) {

        discount = subtotal * 0.10;

    }


    const grandTotal =
        subtotal + delivery - discount;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : formatPrice(delivery);

    }


    if (discountElement) {

        discountElement.textContent =
            discount > 0
                ? "- " + formatPrice(discount)
                : "₹0";

    }


    if (grandTotalElement) {

        grandTotalElement.textContent =
            formatPrice(grandTotal);

    }

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    return "₹" +
        Math.round(price)
            .toLocaleString("en-IN");

}


// ==========================================
// CART NOTIFICATION
// ==========================================

function showCartMessage(message) {

    let notification =
        document.getElementById(
            "cart-notification"
        );


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "cart-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2000);

}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);