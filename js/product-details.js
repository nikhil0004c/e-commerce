// ==========================================
// YONICk - PRODUCT DETAILS
// ==========================================


// ==========================================
// GET PRODUCT ID FROM URL
// ==========================================

function getProductIdFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return Number(params.get("id"));

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatProductPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


// ==========================================
// DISPLAY PRODUCT
// ==========================================

function displayProductDetails() {

    const container =
        document.getElementById(
            "product-details"
        );

    if (!container) {
        return;
    }


    const productId =
        getProductIdFromURL();


    // Find product from your existing database
    const product =
        products.find(
            item => item.id === productId
        );


    // ======================================
    // PRODUCT NOT FOUND
    // ======================================

    if (!product) {

        container.innerHTML = `

            <div class="no-orders">

                <div class="no-orders-icon">
                    😔
                </div>

                <h2>
                    Product Not Found
                </h2>

                <p>
                    Sorry, this product doesn't exist.
                </p>

                <a
                    href="products.html"
                    class="success-btn primary">

                    🛍️ Back to Products

                </a>

            </div>

        `;

        return;
    }


    // ======================================
    // PRODUCT DETAILS
    // ======================================

    container.innerHTML = `

        <div class="product-details-card">


            <!-- PRODUCT IMAGE -->

            <div class="product-details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                        this.src='images/iphone.jpg'
                    "
                >

            </div>



            <!-- PRODUCT INFORMATION -->

            <div class="product-details-info">

                <span class="product-category">

                    ${product.category}

                </span>


                <h1>
                    ${product.name}
                </h1>


                <div class="product-rating">

                    ⭐⭐⭐⭐⭐

                    <span>
                        5.0
                    </span>

                </div>


                <h2 class="product-details-price">

                    ${formatProductPrice(product.price)}

                </h2>


                <p class="product-details-description">

                    Experience excellent quality
                    and performance with
                    <strong>${product.name}</strong>.

                    This product is part of the
                    YONICk collection.

                </p>


                <!-- ACTION BUTTONS -->

                <div class="product-details-actions">

                    <button
                        class="success-btn primary"
                        onclick="addCart(${product.id})">

                        🛒 Add to Cart

                    </button>


                    <button
                        class="success-btn secondary"
                        onclick="addToWishlist(${product.id})">

                        ❤️ Add to Wishlist

                    </button>

                </div>


                <!-- PRODUCT INFORMATION -->

                <div class="product-extra-info">

                    <div>

                        🚚
                        <strong>
                            Fast Delivery
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



        <!-- ==================================
             REVIEWS SECTION
        =================================== -->

        <section class="reviews-section">

            <h2>
                ⭐ Customer Reviews
            </h2>


            <div id="reviews-container">

                <!-- Reviews will be added here -->

            </div>

        </section>

    `;

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateProductCartCount() {

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

function updateProductWishlistCount() {

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

        displayProductDetails();

        updateProductCartCount();

        updateProductWishlistCount();

    }
);
// ==========================================
// YONICk - REVIEWS & RATINGS
// ==========================================


// ==========================================
// GET REVIEWS
// ==========================================

function getProductReviews(productId) {

    const allReviews =
        JSON.parse(
            localStorage.getItem("productReviews")
        ) || {};

    return allReviews[productId] || [];

}


// ==========================================
// SAVE REVIEWS
// ==========================================

function saveProductReviews(
    productId,
    reviews
) {

    const allReviews =
        JSON.parse(
            localStorage.getItem("productReviews")
        ) || {};


    allReviews[productId] = reviews;


    localStorage.setItem(
        "productReviews",
        JSON.stringify(allReviews)
    );

}


// ==========================================
// DISPLAY REVIEWS
// ==========================================

function displayReviews(productId) {

    const container =
        document.getElementById(
            "reviews-container"
        );


    if (!container) {
        return;
    }


    const reviews =
        getProductReviews(productId);


    // ======================================
    // CALCULATE AVERAGE
    // ======================================

    let average = 0;


    if (reviews.length > 0) {

        const total =
            reviews.reduce(
                (sum, review) =>
                    sum + Number(review.rating),
                0
            );

        average =
            (total / reviews.length)
                .toFixed(1);

    }


    // ======================================
    // REVIEWS HEADER
    // ======================================

    let reviewsHTML = `

        <div class="reviews-summary">

            <div class="average-rating">

                <strong>
                    ${average}
                </strong>

                <div>
                    ⭐⭐⭐⭐⭐
                </div>

                <span>
                    ${reviews.length}
                    review${reviews.length !== 1 ? "s" : ""}
                </span>

            </div>


            <div class="write-review">

                <h3>
                    Write a Review
                </h3>


                <input
                    type="text"
                    id="review-name"
                    placeholder="Your name"
                    maxlength="40"
                >


                <select id="review-rating">

                    <option value="5">
                        ⭐⭐⭐⭐⭐ - 5 Stars
                    </option>

                    <option value="4">
                        ⭐⭐⭐⭐ - 4 Stars
                    </option>

                    <option value="3">
                        ⭐⭐⭐ - 3 Stars
                    </option>

                    <option value="2">
                        ⭐⭐ - 2 Stars
                    </option>

                    <option value="1">
                        ⭐ - 1 Star
                    </option>

                </select>


                <textarea
                    id="review-text"
                    placeholder="Write your review..."
                    maxlength="500"
                ></textarea>


                <button
                    class="success-btn primary"
                    onclick="
                        submitProductReview(${productId})
                    "
                >
                    ⭐ Submit Review
                </button>

            </div>

        </div>


        <div class="reviews-list">

    `;


    // ======================================
    // NO REVIEWS
    // ======================================

    if (reviews.length === 0) {

        reviewsHTML += `

            <div class="no-reviews">

                <div>
                    ⭐
                </div>

                <h3>
                    No Reviews Yet
                </h3>

                <p>
                    Be the first to review this product!
                </p>

            </div>

        `;

    }


    // ======================================
    // DISPLAY EACH REVIEW
    // ======================================

    reviews.forEach(
        (review, index) => {

            reviewsHTML += `

                <div class="review-card">

                    <div class="review-header">

                        <strong>
                            👤 ${review.name}
                        </strong>

                        <span>
                            ${review.date}
                        </span>

                    </div>


                    <div class="review-rating">

                        ${"⭐".repeat(
                            Number(review.rating)
                        )}

                    </div>


                    <p>
                        ${review.text}
                    </p>


                    <button
                        class="delete-review"
                        onclick="
                            deleteProductReview(
                                ${productId},
                                ${index}
                            )
                        "
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;

        }
    );


    reviewsHTML += `
        </div>
    `;


    container.innerHTML =
        reviewsHTML;

}


// ==========================================
// SUBMIT REVIEW
// ==========================================

function submitProductReview(productId) {

    const nameInput =
        document.getElementById(
            "review-name"
        );


    const ratingInput =
        document.getElementById(
            "review-rating"
        );


    const textInput =
        document.getElementById(
            "review-text"
        );


    const name =
        nameInput.value.trim();


    const rating =
        Number(ratingInput.value);


    const text =
        textInput.value.trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (!name) {

        alert(
            "Please enter your name."
        );

        nameInput.focus();

        return;
    }


    if (!text) {

        alert(
            "Please write a review."
        );

        textInput.focus();

        return;
    }


    // ======================================
    // CREATE REVIEW
    // ======================================

    const review = {

        name: name,

        rating: rating,

        text: text,

        date: new Date()
            .toLocaleDateString("en-IN")

    };


    // ======================================
    // SAVE REVIEW
    // ======================================

    const reviews =
        getProductReviews(productId);


    reviews.unshift(review);


    saveProductReviews(
        productId,
        reviews
    );


    // ======================================
    // REFRESH REVIEWS
    // ======================================

    displayReviews(productId);


    alert(
        "Your review has been added! ⭐"
    );

}


// ==========================================
// DELETE REVIEW
// ==========================================

function deleteProductReview(
    productId,
    reviewIndex
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this review?"
        );


    if (!confirmDelete) {
        return;
    }


    const reviews =
        getProductReviews(productId);


    reviews.splice(
        reviewIndex,
        1
    );


    saveProductReviews(
        productId,
        reviews
    );


    displayReviews(productId);

}


// ==========================================
// LOAD REVIEWS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const productId =
            getProductIdFromURL();


        if (productId) {

            displayReviews(
                productId
            );

        }

    }
);