// ==========================================
// YONICk PRODUCT DETAILS
// ==========================================


// ==========================================
// DETAIL QUANTITY
// ==========================================

let detailQuantity = 1;


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        updateWishlistCount();

        loadProduct();

    }
);


// ==========================================
// LOAD PRODUCT
// ==========================================

function loadProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    const product =
        products.find(
            item =>
                item.id === productId
        );


    const container =
        document.getElementById(
            "product-detail"
        );


    // ==========================================
    // PRODUCT NOT FOUND
    // ==========================================

    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <h2>
                    😔 Product Not Found
                </h2>

                <p>
                    The product you are looking
                    for does not exist.
                </p>

                <a href="index.html">

                    ← Back to Store

                </a>

            </div>

        `;

        return;

    }


    // ==========================================
    // RATING
    // ==========================================

    const rating =
        getProductRating(product.id);


    // ==========================================
    // OLD PRICE
    // ==========================================

    const oldPrice =
        Math.round(
            product.price * 1.15
        );


    // ==========================================
    // DISCOUNT
    // ==========================================

    const discount =
        Math.round(
            (
                (oldPrice - product.price)
                / oldPrice
            ) * 100
        );


    // ==========================================
    // WISHLIST STATUS
    // ==========================================

    const isWishlisted =
        wishlist.some(
            item =>
                item.id === product.id
        );


    // ==========================================
    // PRODUCT DETAILS HTML
    // ==========================================

    container.innerHTML = `

        <section class="product-detail">


            <!-- ==================================
                 IMAGE
            ================================== -->

            <div class="detail-image">

                <span class="detail-category">

                    ${product.category}

                </span>


                <img
                    src="${product.image}"
                    alt="${product.name}"

                    onerror="
                        this.src='images/iphone.jpg'
                    "
                >

            </div>



            <!-- ==================================
                 INFORMATION
            ================================== -->

            <div class="detail-info">


                <!-- CATEGORY -->

                <p class="detail-category-text">

                    ${product.category}

                </p>


                <!-- NAME -->

                <h1>

                    ${product.name}

                </h1>


                <!-- ==================================
                     RATING
                ================================== -->

                <div class="rating">

                    ⭐ ${rating}

                    <span>

                        (${getReviewCount(product.id)}
                        Reviews)

                    </span>

                </div>


                <!-- ==================================
                     PRICE
                ================================== -->

                <div class="detail-price">

                    <span class="old-price">

                        ₹${oldPrice.toLocaleString("en-IN")}

                    </span>


                    <span class="current-price">

                        ₹${product.price.toLocaleString("en-IN")}

                    </span>


                    <span class="discount-badge">

                        ${discount}% OFF

                    </span>

                </div>


                <p class="tax-info">

                    Inclusive of all taxes

                </p>


                <!-- ==================================
                     DESCRIPTION
                ================================== -->

                <div class="description">

                    <h3>

                        About this product

                    </h3>


                    <p>

                        Experience premium quality
                        with the ${product.name}.
                        Designed for modern users,
                        this ${product.category.toLowerCase()}
                        product delivers excellent
                        performance, reliability
                        and style.

                    </p>

                </div>


                <!-- ==================================
                     FEATURES
                ================================== -->

                <div class="product-features">

                    <h3>

                        Key Features

                    </h3>

                    <ul>

                        <li>
                            ✓ Premium quality
                        </li>

                        <li>
                            ✓ Modern design
                        </li>

                        <li>
                            ✓ Reliable performance
                        </li>

                        <li>
                            ✓ Suitable for everyday use
                        </li>

                    </ul>

                </div>


                <!-- ==================================
                     STOCK
                ================================== -->

                <div class="stock">

                    🟢 In Stock

                </div>


                <!-- ==================================
                     QUANTITY
                ================================== -->

                <div class="detail-quantity">

                    <strong>

                        Quantity:

                    </strong>


                    <button
                        onclick="changeDetailQty(-1)"
                    >

                        −

                    </button>


                    <span id="detail-quantity">

                        1

                    </span>


                    <button
                        onclick="changeDetailQty(1)"
                    >

                        +

                    </button>

                </div>


                <!-- ==================================
                     BUTTONS
                ================================== -->

                <div class="detail-buttons">


                    <!-- ADD TO CART -->

                    <button
                        class="detail-cart-btn"

                        onclick="
                            addProductToCart(
                                ${product.id}
                            )
                        "
                    >

                        🛒 Add to Cart

                    </button>


                    <!-- WISHLIST -->

                    <button
                        class="
                            wishlist-btn
                            ${isWishlisted
                                ? "wishlisted"
                                : ""
                            }
                        "

                        id="wishlist-btn"

                        data-product-id="${product.id}"

                        onclick="
                            toggleWishlist(
                                ${product.id}
                            );
                            updateProductWishlistButton(
                                ${product.id}
                            );
                        "
                    >

                        ${
                            isWishlisted
                                ? "❤️ In Wishlist"
                                : "♡ Wishlist"
                        }

                    </button>

                </div>


                <!-- ==================================
                     BACK
                ================================== -->

                <a
                    href="index.html"
                    class="back-products"
                >

                    ← Continue Shopping

                </a>


            </div>

        </section>

    `;

}


// ==========================================
// QUANTITY CONTROL
// ==========================================

function changeDetailQty(change) {

    detailQuantity += change;


    if (detailQuantity < 1) {

        detailQuantity = 1;

    }


    if (detailQuantity > 10) {

        detailQuantity = 10;

    }


    const quantityElement =
        document.getElementById(
            "detail-quantity"
        );


    if (quantityElement) {

        quantityElement.textContent =
            detailQuantity;

    }

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addProductToCart(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity +=
            detailQuantity;

    }

    else {

        cart.push({

            ...product,

            quantity:
                detailQuantity

        });

    }


    saveCart();


    showCartMessage(

        `${product.name} × ${detailQuantity} added 🛒`

    );


    // Reset quantity

    detailQuantity = 1;


    const quantityElement =
        document.getElementById(
            "detail-quantity"
        );


    if (quantityElement) {

        quantityElement.textContent =
            "1";

    }

}


// ==========================================
// UPDATE PRODUCT WISHLIST BUTTON
// ==========================================

function updateProductWishlistButton(id) {

    const button =
        document.getElementById(
            "wishlist-btn"
        );


    if (!button) return;


    const exists =
        wishlist.some(
            item =>
                item.id === id
        );


    if (exists) {

        button.innerHTML =
            "❤️ In Wishlist";

        button.classList.add(
            "wishlisted"
        );

    }

    else {

        button.innerHTML =
            "♡ Wishlist";

        button.classList.remove(
            "wishlisted"
        );

    }

}


// ==========================================
// PRODUCT RATING
// ==========================================

function getProductRating(id) {

    const ratings = {

        1: "4.8",
        2: "4.7",
        3: "4.6",
        4: "4.5",
        5: "4.4",

        6: "4.9",
        7: "4.8",
        8: "4.5",
        9: "4.4",
        10: "4.3",

        11: "4.8",
        12: "4.7",
        13: "4.5",
        14: "4.4",
        15: "4.3",

        16: "4.9",
        17: "4.8",
        18: "4.4",
        19: "4.5",
        20: "4.6",

        21: "4.2",
        22: "4.3",
        23: "4.4",
        24: "4.2",
        25: "4.5",

        26: "4.6",
        27: "4.4",
        28: "4.3",
        29: "4.5",
        30: "4.4"

    };


    return ratings[id] || "4.5";

}


// ==========================================
// REVIEW COUNT
// ==========================================

function getReviewCount(id) {

    const reviews = {

        1: 428,
        2: 315,
        3: 286,
        4: 241,
        5: 198,

        6: 367,
        7: 294,
        8: 176,
        9: 154,
        10: 132,

        11: 512,
        12: 438,
        13: 267,
        14: 184,
        15: 321,

        16: 623,
        17: 487,
        18: 154,
        19: 201,
        20: 176,

        21: 143,
        22: 128,
        23: 167,
        24: 189,
        25: 112,

        26: 238,
        27: 314,
        28: 156,
        29: 143,
        30: 198

    };


    return reviews[id] || 128;

}