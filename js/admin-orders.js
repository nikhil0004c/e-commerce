// ==========================================
// YONICk - ADMIN ORDER MANAGEMENT
// ==========================================


// ==========================================
// GET ORDERS
// ==========================================

function getAdminOrders() {

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}


// ==========================================
// SAVE ORDERS
// ==========================================

function saveAdminOrders(orders) {

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}


// ==========================================
// STATUS INFORMATION
// ==========================================

function getAdminStatusInfo(status) {

    const statuses = {

        confirmed: {
            icon: "🟢",
            text: "Order Confirmed"
        },

        packed: {
            icon: "📦",
            text: "Order Packed"
        },

        shipped: {
            icon: "🚚",
            text: "Shipped"
        },

        out_for_delivery: {
            icon: "🏠",
            text: "Out for Delivery"
        },

        delivered: {
            icon: "🎉",
            text: "Delivered"
        }

    };


    return statuses[status]
        || statuses.confirmed;

}


// ==========================================
// DISPLAY ADMIN ORDERS
// ==========================================

function displayAdminOrders(searchTerm = "") {

    const container =
        document.getElementById(
            "admin-orders-list"
        );


    if (!container) {
        return;
    }


    const orders =
        getAdminOrders();


    // Search orders
    const filteredOrders =
        orders.filter(order =>
            order.orderId
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )
        );


    // ======================================
    // NO ORDERS
    // ======================================

    if (filteredOrders.length === 0) {

        container.innerHTML = `

            <div class="no-orders">

                <div class="no-orders-icon">
                    📦
                </div>

                <h2>
                    No Orders Found
                </h2>

                <p>
                    There are no orders matching
                    your search.
                </p>

            </div>

        `;

        updateAdminStats();

        return;
    }


    container.innerHTML = "";


    // ======================================
    // CREATE ORDER CARDS
    // ======================================

    filteredOrders.forEach(order => {

        // Make sure old orders have a status
        const status =
            order.status || "confirmed";


        const statusInfo =
            getAdminStatusInfo(status);


        let productsHTML = "";


        order.items.forEach(item => {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);


            productsHTML += `

                <div class="admin-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="
                            this.src='images/iphone.jpg'
                        "
                    >

                    <div class="admin-product-info">

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

                    <strong>
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </strong>

                </div>

            `;

        });


        // ==================================
        // ORDER CARD
        // ==================================

        container.innerHTML += `

            <div class="admin-order-card">


                <!-- HEADER -->

                <div class="admin-order-header">

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



                <!-- CUSTOMER -->

                <div class="admin-customer">

                    <h3>
                        👤 Customer
                    </h3>

                    <p>
                        <strong>
                            ${order.customer.name}
                        </strong>
                    </p>

                    <p>
                        📱 ${order.customer.phone}
                    </p>

                    <p>
                        📧 ${order.customer.email}
                    </p>

                </div>



                <!-- PRODUCTS -->

                <div class="admin-products">

                    <h3>
                        🛍️ Products
                    </h3>

                    ${productsHTML}

                </div>



                <!-- CURRENT STATUS -->

                <div class="admin-current-status">

                    <span>
                        Current Status
                    </span>

                    <strong>

                        ${statusInfo.icon}
                        ${statusInfo.text}

                    </strong>

                </div>



                <!-- STATUS CONTROL -->

                <div class="admin-status-control">

                    <label for="status-${order.orderId}">

                        Update Order Status

                    </label>


                    <select
                        id="status-${order.orderId}"
                        onchange="
                            updateOrderStatus(
                                '${order.orderId}',
                                this.value
                            )
                        "
                    >

                        <option
                            value="confirmed"
                            ${status === "confirmed" ? "selected" : ""}
                        >
                            🟢 Order Confirmed
                        </option>

                        <option
                            value="packed"
                            ${status === "packed" ? "selected" : ""}
                        >
                            📦 Order Packed
                        </option>

                        <option
                            value="shipped"
                            ${status === "shipped" ? "selected" : ""}
                        >
                            🚚 Shipped
                        </option>

                        <option
                            value="out_for_delivery"
                            ${status === "out_for_delivery" ? "selected" : ""}
                        >
                            🏠 Out for Delivery
                        </option>

                        <option
                            value="delivered"
                            ${status === "delivered" ? "selected" : ""}
                        >
                            🎉 Delivered
                        </option>

                    </select>

                </div>



                <!-- TOTAL -->

                <div class="admin-order-footer">

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
                            Total
                        </span>

                        <strong>
                            ₹${Number(order.total)
                                .toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>


            </div>

        `;

    });


    updateAdminStats();

}


// ==========================================
// UPDATE ORDER STATUS
// ==========================================

function updateOrderStatus(
    orderId,
    newStatus
) {

    const orders =
        getAdminOrders();


    const order =
        orders.find(
            item =>
                item.orderId === orderId
        );


    if (!order) {

        alert("Order not found.");

        return;

    }


    // Update status
    order.status = newStatus;


    // Save
    saveAdminOrders(orders);


    // Refresh display
    displayAdminOrders(
        document.getElementById(
            "admin-search"
        ).value
    );


    alert(
        "Order status updated successfully!"
    );

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateAdminStats() {

    const orders =
        getAdminOrders();


    const total =
        orders.length;


    const confirmed =
        orders.filter(
            order =>
                (order.status || "confirmed")
                === "confirmed"
        ).length;


    const shipped =
        orders.filter(
            order =>
                (order.status || "confirmed")
                === "shipped"
        ).length;


    const delivered =
        orders.filter(
            order =>
                (order.status || "confirmed")
                === "delivered"
        ).length;


    const totalElement =
        document.getElementById(
            "total-orders"
        );

    const confirmedElement =
        document.getElementById(
            "confirmed-orders"
        );

    const shippedElement =
        document.getElementById(
            "shipped-orders"
        );

    const deliveredElement =
        document.getElementById(
            "delivered-orders"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (confirmedElement) {
        confirmedElement.textContent = confirmed;
    }

    if (shippedElement) {
        shippedElement.textContent = shipped;
    }

    if (deliveredElement) {
        deliveredElement.textContent = delivered;
    }

}


// ==========================================
// SEARCH
// ==========================================

function setupAdminSearch() {

    const searchInput =
        document.getElementById(
            "admin-search"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            displayAdminOrders(
                this.value
            );

        }
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayAdminOrders();

        setupAdminSearch();

        updateAdminStats();

    }
);