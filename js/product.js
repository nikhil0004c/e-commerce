// ==========================================
// YONICk PRODUCT DETAILS
// ==========================================

let detailQuantity = 1;


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    updateWishlistCount();

    loadProduct();

});


// ==========================================
// LOAD PRODUCT
// ==========================================

function loadProduct() {

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        Number(params.get("id"));

    const product =
        products.find(item => item.id === productId);

    const container =
        document.getElementById("product-detail");


    if (!container) return;


    // ==========================================
    // PRODUCT NOT FOUND
    // ==========================================

    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <div style="font-size:50px;">
                    😔
                </div>

                <h2>
                    Product Not Found
                </h2>

                <p>
                    The product you are looking for
                    does not exist.
                </p>

                <a
                    href="products.html"
                    class="success-btn primary">

                    ← Back to Products

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

    const reviews =
        getReviewCount(product.id);


    // ==========================================
    // OLD PRICE
    // ==========================================

    const oldPrice =
        Math.round(product.price * 1.15);


    // ==========================================
    // DISCOUNT
    // ==========================================

    const discount =
        Math.round(
            ((oldPrice - product.price) / oldPrice) * 100
        );


    // ==========================================
    // WISHLIST STATUS
    // ==========================================

    const isWishlisted =
        typeof wishlist !== "undefined" &&
        wishlist.some(
            item => item.id === product.id
        );


    // ==========================================
    // PRODUCT DETAILS
    // ==========================================

    container.innerHTML = `

        <div class="product-detail-card">


            <!-- ==================================
                 PRODUCT IMAGE GALLERY
            ================================== -->

            <div class="product-gallery">


                <!-- MAIN IMAGE -->

                <div class="product-detail-image">

                    <span class="product-detail-category">

                        ${product.category}

                    </span>


                    <img
                        id="main-product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="
                            this.src='images/iphone-16.jpg'
                        "
                    >

                </div>


                <!-- ==================================
                     IMAGE THUMBNAILS
                ================================== -->

                <div class="product-thumbnails">

                    <button
                        class="product-thumbnail active"
                        onclick="
                            changeProductImage(
                                '${product.image}',
                                this
                            )
                        "
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            onerror="
                                this.src='images/iphone-16.jpg'
                            "
                        >

                    </button>

                </div>

            </div>



            <!-- ==================================
                 PRODUCT INFORMATION
            ================================== -->

            <div class="product-detail-info">


                <div class="product-detail-category-text">

                    ${product.category}

                </div>


                <h1>

                    ${product.name}

                </h1>


                <!-- RATING -->

                <div class="product-rating">

                    <span class="stars">

                        ⭐⭐⭐⭐⭐

                    </span>

                    <strong>

                        ${rating}

                    </strong>

                    <span>

                        (${reviews} Reviews)

                    </span>

                </div>


                <!-- DESCRIPTION -->

                <p class="product-detail-description">

                    Experience premium quality with the
                    ${product.name}. Designed for modern
                    users, this ${product.category.toLowerCase()}
                    product delivers excellent performance,
                    reliability and style.

                </p>


                <!-- PRICE -->

                <div class="product-detail-price">

                    ₹${product.price.toLocaleString("en-IN")}

                </div>


                <div class="product-price-extra">

                    <span class="old-price">

                        ₹${oldPrice.toLocaleString("en-IN")}

                    </span>


                    <span class="discount-badge">

                        ${discount}% OFF

                    </span>

                </div>


                <p class="tax-info">

                    Inclusive of all taxes

                </p>


                <!-- OFFER -->

                <div class="product-offer">

                    🎉 Special offer available on this product

                </div>


                <!-- ==================================
                     FEATURES
                ================================== -->

                <div class="product-features">


                    <div class="product-feature">

                        <div class="product-feature-icon">
                            ⚡
                        </div>

                        <div>

                            <strong>
                                Premium Quality
                            </strong>

                            <span>
                                Carefully selected product
                            </span>

                        </div>

                    </div>


                    <div class="product-feature">

                        <div class="product-feature-icon">
                            🛡️
                        </div>

                        <div>

                            <strong>
                                Reliable
                            </strong>

                            <span>
                                Built for everyday use
                            </span>

                        </div>

                    </div>


                    <div class="product-feature">

                        <div class="product-feature-icon">
                            ✨
                        </div>

                        <div>

                            <strong>
                                Modern Design
                            </strong>

                            <span>
                                Stylish and practical
                            </span>

                        </div>

                    </div>


                    <div class="product-feature">

                        <div class="product-feature-icon">
                            📦
                        </div>

                        <div>

                            <strong>
                                Secure Packaging
                            </strong>

                            <span>
                                Carefully packed for delivery
                            </span>

                        </div>

                    </div>

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
                        onclick="changeDetailQty(-1)">

                        −

                    </button>


                    <span id="detail-quantity">

                        1

                    </span>


                    <button
                        onclick="changeDetailQty(1)">

                        +

                    </button>

                </div>


                <!-- ==================================
                     ACTION BUTTONS
                ================================== -->

                <div class="product-actions">


                    <button
                        class="product-add-cart"
                        onclick="
                            addProductToCart(${product.id})
                        ">

                        🛒 Add to Cart

                    </button>


                    <button
                        id="wishlist-btn"
                        class="
                            product-wishlist
                            ${isWishlisted ? "wishlisted" : ""}
                        "
                        onclick="
                            toggleWishlist(${product.id});
                            updateProductWishlistButton(${product.id});
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
                     QUICK INFO
                ================================== -->

                <div class="product-quick-info">


                    <div>

                        🚚

                        <strong>
                            Free Delivery
                        </strong>

                    </div>


                    <div>

                        🔒

                        <strong>
                            Secure Payment
                        </strong>

                    </div>


                    <div>

                        ↩️

                        <strong>
                            Easy Returns
                        </strong>

                    </div>


                </div>


            </div>

        </div>

    `;


    // ==========================================
    // LOAD RELATED PRODUCTS
    // ==========================================

    displayRelatedProducts(product);

}


// ==========================================
// CHANGE PRODUCT IMAGE
// ==========================================

function changeProductImage(image, thumbnail) {

    const mainImage =
        document.getElementById("main-product-image");


    if (!mainImage) return;


    mainImage.src = image;


    // Remove active class

    document
        .querySelectorAll(".product-thumbnail")
        .forEach(item => {

            item.classList.remove("active");

        });


    // Add active class

    if (thumbnail) {

        thumbnail.classList.add("active");

    }

}


// ==========================================
// RELATED PRODUCTS
// ==========================================

function displayRelatedProducts(currentProduct) {

    const container =
        document.getElementById("related-products");


    if (!container) return;


    const related =
        products
            .filter(item =>
                item.category === currentProduct.category &&
                item.id !== currentProduct.id
            )
            .slice(0, 4);


    if (related.length === 0) {

        container.innerHTML = "";

        return;

    }


    container.innerHTML = "";


    related.forEach(product => {

        const isWishlisted =
            typeof wishlist !== "undefined" &&
            wishlist.some(
                item => item.id === product.id
            );


        container.innerHTML += `

            <div
                class="product-card related-product-card"
                onclick="openProduct(${product.id})"
            >


                <div class="product-image">

                    <span class="product-category">

                        ${product.category}

                    </span>


                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="
                            this.src='images/iphone-16.jpg'
                        "
                    >

                </div>


                <div class="product-info">

                    <h3>

                        ${product.name}

                    </h3>


                    <p class="category-name">

                        ${product.category}

                    </p>


                    <p class="price">

                        ₹${product.price.toLocaleString("en-IN")}

                    </p>


                    <button
                        class="
                            wishlist-btn
                            ${isWishlisted ? "wishlisted" : ""}
                        "
                        onclick="
                            event.stopPropagation();
                            toggleWishlist(${product.id});
                        "
                    >

                        ${
                            isWishlisted
                                ? "❤️ Wishlisted"
                                : "♡ Wishlist"
                        }

                    </button>


                    <button
                        class="add-cart-btn"
                        onclick="
                            event.stopPropagation();
                            addCart(${product.id});
                        "
                    >

                        🛒 Add to Cart

                    </button>

                </div>

            </div>

        `;

    });

}


// ==========================================
// OPEN PRODUCT
// ==========================================

function openProduct(id) {

    window.location.href =
        "product.html?id=" + id;

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
        document.getElementById("detail-quantity");


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
            item => item.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
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


    detailQuantity = 1;


    const quantityElement =
        document.getElementById("detail-quantity");


    if (quantityElement) {

        quantityElement.textContent = "1";

    }

}


// ==========================================
// UPDATE WISHLIST BUTTON
// ==========================================

function updateProductWishlistButton(id) {

    const button =
        document.getElementById("wishlist-btn");


    if (!button) return;


    const exists =
        wishlist.some(
            item => item.id === id
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