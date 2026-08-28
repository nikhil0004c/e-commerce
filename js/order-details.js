// ==========================================
// YONICk - ORDER DETAILS
// ==========================================


// ==========================================
// GET ORDER ID FROM URL
// ==========================================

function getOrderIdFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatDetailsPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


// ==========================================
// DISPLAY ORDER DETAILS
// ==========================================

function displayOrderDetails() {

    const container =
        document.getElementById(
            "order-details"
        );

    if (!container) {
        return;
    }


    // Get order ID
    const orderId =
        getOrderIdFromURL();


    // Get all saved orders
    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // Find selected order
    const order =
        orders.find(
            item => item.orderId === orderId
        );


    // ======================================
    // ORDER NOT FOUND
    // ======================================

    if (!order) {

        container.innerHTML = `

            <div class="no-orders">

                <div class="no-orders-icon">
                    😔
                </div>

                <h2>
                    Order Not Found
                </h2>

                <p>
                    We couldn't find the order
                    you're looking for.
                </p>

                <a
                    href="orders.html"
                    class="success-btn primary">

                    📦 Back to My Orders

                </a>

            </div>

        `;

        return;
    }


    // ======================================
    // PRODUCTS
    // ======================================

    let itemsHTML = "";


    order.items.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        itemsHTML += `

            <div class="details-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="
                        this.src='images/iphone.jpg'
                    "
                >

                <div class="details-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.category || "Product"}
                    </p>

                    <span>
                        Price:
                        ${formatDetailsPrice(item.price)}
                    </span>

                    <span>
                        Quantity:
                        ${item.quantity}
                    </span>

                </div>


                <strong class="details-product-total">

                    ${formatDetailsPrice(itemTotal)}

                </strong>

            </div>

        `;

    });


    // ======================================
    // DISPLAY COMPLETE ORDER
    // ======================================

    container.innerHTML = `

        <!-- ORDER HEADER -->

        <div class="details-card">

            <div class="details-order-header">

                <div>

                    <span>
                        ORDER ID
                    </span>

                    <strong>
                        ${order.orderId}
                    </strong>

                </div>


                <div>

                    <span>
                        ORDER DATE
                    </span>

                    <strong>
                        ${order.date}
                    </strong>

                </div>

            </div>

        </div>



        <!-- ORDER STATUS -->

        <div class="details-card">

            <h2>
                📦 Order Status
            </h2>

            <div class="details-status">

                <div class="status-step active">

                    <div>
                        ✓
                    </div>

                    <span>
                        Order Confirmed
                    </span>

                </div>


                <div class="status-line"></div>


                <div class="status-step">

                    <div>
                        2
                    </div>

                    <span>
                        Shipped
                    </span>

                </div>


                <div class="status-line"></div>


                <div class="status-step">

                    <div>
                        3
                    </div>

                    <span>
                        Delivered
                    </span>

                </div>

            </div>

        </div>



        <!-- PRODUCTS -->

        <div class="details-card">

            <h2>
                🛍️ Items Ordered
            </h2>

            <div class="details-products">

                ${itemsHTML}

            </div>

        </div>



        <!-- PAYMENT -->

        <div class="details-card">

            <h2>
                💳 Payment Information
            </h2>

            <div class="details-info-row">

                <span>
                    Payment Method
                </span>

                <strong>
                    ${order.payment}
                </strong>

            </div>


            <div class="details-info-row">

                <span>
                    Total Amount
                </span>

                <strong class="details-total">
                    ${formatDetailsPrice(order.total)}
                </strong>

            </div>

        </div>



        <!-- DELIVERY -->

        <div class="details-card">

            <h2>
                🚚 Delivery Address
            </h2>


            <div class="details-address">

                <strong>
                    ${order.customer.name}
                </strong>

                <p>
                    ${order.customer.address}
                </p>

                <p>
                    ${order.customer.city},
                    ${order.customer.state}
                    - ${order.customer.pincode}
                </p>

                <p>
                    📱 ${order.customer.phone}
                </p>

                <p>
                    📧 ${order.customer.email}
                </p>

            </div>

        </div>



        <!-- ACTIONS -->

        <div class="details-actions">

            <a
                href="orders.html"
                class="success-btn secondary">

                ← Back to My Orders

            </a>


            <a
                href="products.html"
                class="success-btn primary">

                🛍️ Continue Shopping

            </a>

        </div>

    `;

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateDetailsCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const count =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent = count;

    }

}


// ==========================================
// UPDATE WISHLIST COUNT
// ==========================================

function updateDetailsWishlistCount() {

    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    const wishlistCount =
        document.getElementById(
            "wishlist-count"
        );


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayOrderDetails();

        updateDetailsCartCount();

        updateDetailsWishlistCount();

    }
);