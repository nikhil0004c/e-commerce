// ==========================================
// YONICk - ORDER HISTORY + ORDER TRACKING
// ==========================================


// ==========================================
// SAVE LAST ORDER TO ORDER HISTORY
// ==========================================

function saveOrderToHistory() {

    const lastOrder = JSON.parse(
        localStorage.getItem("lastOrder")
    );

    if (!lastOrder) {
        return;
    }

    let orders = JSON.parse(
        localStorage.getItem("orders")
    ) || [];


    const alreadyExists = orders.some(
        order => order.orderId === lastOrder.orderId
    );


    if (!alreadyExists) {

        // Add default tracking status
        if (!lastOrder.status) {
            lastOrder.status = "confirmed";
        }

        orders.unshift(lastOrder);

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );
    }
}


// ==========================================
// GET ALL ORDERS
// ==========================================

function getOrders() {

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatOrderPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


// ==========================================
// GET ORDER STATUS
// ==========================================

function getOrderStatus(order) {

    return order.status || "confirmed";

}


// ==========================================
// STATUS INFORMATION
// ==========================================

function getStatusInfo(status) {

    const statusData = {

        confirmed: {
            icon: "🟢",
            title: "Order Confirmed",
            message: "Your order has been confirmed."
        },

        packed: {
            icon: "📦",
            title: "Order Packed",
            message: "Your order has been packed."
        },

        shipped: {
            icon: "🚚",
            title: "Shipped",
            message: "Your order is on the way."
        },

        out_for_delivery: {
            icon: "🏠",
            title: "Out for Delivery",
            message: "Your order is out for delivery."
        },

        delivered: {
            icon: "🎉",
            title: "Delivered",
            message: "Your order has been delivered."
        }

    };


    return statusData[status]
        || statusData.confirmed;

}


// ==========================================
// DISPLAY ORDERS
// ==========================================

function displayOrders() {

    const ordersList =
        document.getElementById("orders-list");


    if (!ordersList) {
        return;
    }


    const orders = getOrders();


    // ======================================
    // NO ORDERS
    // ======================================

    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="no-orders">

                <div class="no-orders-icon">
                    📦
                </div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a
                    href="products.html"
                    class="success-btn primary">

                    🛍️ Start Shopping

                </a>

            </div>

        `;

        return;
    }


    ordersList.innerHTML = "";


    // ======================================
    // CREATE ORDER CARDS
    // ======================================

    orders.forEach(order => {

        let itemsHTML = "";


        // ==================================
        // PRODUCTS
        // ==================================

        order.items.forEach(item => {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);


            itemsHTML += `

                <div class="order-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="
                            this.src='images/iphone.jpg'
                        "
                    >


                    <div class="order-product-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ${item.category || "Product"}
                        </span>

                        <small>
                            Quantity:
                            ${item.quantity}
                        </small>

                    </div>


                    <strong class="order-product-price">

                        ${formatOrderPrice(itemTotal)}

                    </strong>

                </div>

            `;

        });


        // ==================================
        // ORDER STATUS
        // ==================================

        const status =
            getOrderStatus(order);


        const statusInfo =
            getStatusInfo(status);


        // ==================================
        // ORDER CARD
        // ==================================

        ordersList.innerHTML += `

            <div class="order-card">


                <!-- ORDER HEADER -->

                <div class="order-header">

                    <div>

                        <span class="order-label">
                            ORDER ID
                        </span>

                        <strong>
                            ${order.orderId}
                        </strong>

                    </div>


                    <div>

                        <span class="order-label">
                            ORDER DATE
                        </span>

                        <strong>
                            ${order.date}
                        </strong>

                    </div>

                </div>



                <!-- ==================================
                     ORDER STATUS
                =================================== -->

                <div class="order-status">

                    <span>
                        ${statusInfo.icon}
                    </span>

                    <strong>
                        ${statusInfo.title}
                    </strong>

                    <span>
                        ${statusInfo.message}
                    </span>

                </div>



                <!-- ==================================
                     TRACKING TIMELINE
                =================================== -->

                <div class="order-tracking">


                    <div class="
                        tracking-step
                        ${status === "confirmed" ||
                          status === "packed" ||
                          status === "shipped" ||
                          status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    ">

                        <div class="tracking-icon">
                            ✓
                        </div>

                        <span>
                            Confirmed
                        </span>

                    </div>


                    <div class="
                        tracking-line
                        ${status === "packed" ||
                          status === "shipped" ||
                          status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    "></div>


                    <div class="
                        tracking-step
                        ${status === "packed" ||
                          status === "shipped" ||
                          status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    ">

                        <div class="tracking-icon">
                            📦
                        </div>

                        <span>
                            Packed
                        </span>

                    </div>


                    <div class="
                        tracking-line
                        ${status === "shipped" ||
                          status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    "></div>


                    <div class="
                        tracking-step
                        ${status === "shipped" ||
                          status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    ">

                        <div class="tracking-icon">
                            🚚
                        </div>

                        <span>
                            Shipped
                        </span>

                    </div>


                    <div class="
                        tracking-line
                        ${status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    "></div>


                    <div class="
                        tracking-step
                        ${status === "out_for_delivery" ||
                          status === "delivered"
                          ? "completed" : ""}
                    ">

                        <div class="tracking-icon">
                            🏠
                        </div>

                        <span>
                            Out for Delivery
                        </span>

                    </div>


                    <div class="
                        tracking-line
                        ${status === "delivered"
                          ? "completed" : ""}
                    "></div>


                    <div class="
                        tracking-step
                        ${status === "delivered"
                          ? "completed" : ""}
                    ">

                        <div class="tracking-icon">
                            🎉
                        </div>

                        <span>
                            Delivered
                        </span>

                    </div>

                </div>



                <!-- ==================================
                     PRODUCTS
                =================================== -->

                <div class="order-products">

                    ${itemsHTML}

                </div>



                <!-- ==================================
                     ORDER FOOTER
                =================================== -->

                <div class="order-footer">

                    <div>

                        <span>
                            Payment
                        </span>

                        <strong>
                            ${order.payment}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Total Paid
                        </span>

                        <strong class="order-total">

                            ${formatOrderPrice(order.total)}

                        </strong>

                    </div>

                </div>



                <!-- ==================================
                     DELIVERY
                =================================== -->

                <div class="order-delivery">

                    <strong>
                        🚚 Delivery Address
                    </strong>

                    <p>
                        ${order.customer.name}
                    </p>

                    <p>
                        ${order.customer.address},
                        ${order.customer.city},
                        ${order.customer.state}
                        - ${order.customer.pincode}
                    </p>

                </div>



                <!-- ==================================
                     VIEW DETAILS
                =================================== -->

                <div class="order-details-button">

                    <a
                        href="order-details.html?id=${encodeURIComponent(order.orderId)}"
                        class="success-btn secondary">

                        👁️ View Order Details

                    </a>

                </div>


            </div>

        `;

    });

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateOrdersCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 1),
        0
    );


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = count;

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        saveOrderToHistory();

        displayOrders();

        updateOrdersCartCount();

    }
);