// ==========================================
// YONICk WISHLIST SYSTEM
// ==========================================


// ==========================================
// LOAD WISHLIST
// ==========================================

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];


// ==========================================
// SAVE WISHLIST
// ==========================================

function saveWishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

}


// ==========================================
// WISHLIST COUNT
// ==========================================

function updateWishlistCount() {

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
// ADD / REMOVE WISHLIST
// ==========================================

function toggleWishlist(id) {

    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) {

        console.error(
            "Product not found:",
            id
        );

        return;

    }


    const existingIndex =
        wishlist.findIndex(
            item =>
                item.id === id
        );


    // REMOVE

    if (existingIndex !== -1) {

        wishlist.splice(
            existingIndex,
            1
        );


        saveWishlist();


        showWishlistMessage(
            product.name +
            " removed from wishlist"
        );


    }

    // ADD

    else {

        wishlist.push(product);


        saveWishlist();


        showWishlistMessage(
            product.name +
            " added to wishlist ❤️"
        );

    }


    // Update buttons on current page

    updateWishlistButtons();

}


// ==========================================
// UPDATE WISHLIST BUTTONS
// ==========================================

function updateWishlistButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    buttons.forEach(button => {

        const id =
            Number(
                button.dataset.productId
            );


        if (!id) return;


        const isWishlisted =
            wishlist.some(
                item =>
                    item.id === id
            );


        if (isWishlisted) {

            button.innerHTML =
                "❤️ Wishlisted";

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

    });

}


// ==========================================
// WISHLIST NOTIFICATION
// ==========================================

function showWishlistMessage(message) {

    let notification =
        document.getElementById(
            "wishlist-notification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "wishlist-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(
        function () {

            notification.classList.remove(
                "show"
            );

        },
        2000
    );

}


// ==========================================
// DISPLAY WISHLIST
// ==========================================

function displayWishlist() {

    const container =
        document.getElementById(
            "wishlist-items"
        );

    const emptyWishlist =
        document.getElementById(
            "empty-wishlist"
        );


    // Not wishlist page

    if (!container) return;


    container.innerHTML = "";


    // ==========================================
    // EMPTY WISHLIST
    // ==========================================

    if (wishlist.length === 0) {

        if (emptyWishlist) {

            emptyWishlist.style.display =
                "block";

        }

        return;

    }


    // Hide empty message

    if (emptyWishlist) {

        emptyWishlist.style.display =
            "none";

    }


    // ==========================================
    // DISPLAY PRODUCTS
    // ==========================================

    wishlist.forEach(product => {

        container.innerHTML += `

            <div
                class="product-card"
                onclick="openWishlistProduct(${product.id})"
            >

                <!-- PRODUCT IMAGE -->

                <div class="product-image">

                    <span class="product-category">

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


                <!-- PRODUCT INFORMATION -->

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


                    <!-- ADD TO CART -->

                    <button
                        class="add-cart-btn"

                        onclick="
                            event.stopPropagation();
                            addCart(${product.id});
                        "
                    >

                        🛒 Add to Cart

                    </button>


                    <!-- REMOVE FROM WISHLIST -->

                    <button
                        class="wishlist-btn wishlisted"

                        data-product-id="${product.id}"

                        onclick="
                            event.stopPropagation();
                            removeFromWishlist(${product.id});
                        "
                    >

                        ❤️ Remove

                    </button>

                </div>

            </div>

        `;

    });

}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(id) {

    const product =
        products.find(
            product =>
                product.id === id
        );


    wishlist =
        wishlist.filter(
            item =>
                item.id !== id
        );


    saveWishlist();


    if (product) {

        showWishlistMessage(
            product.name +
            " removed from wishlist"
        );

    }


    displayWishlist();

}


// ==========================================
// OPEN PRODUCT
// ==========================================

function openWishlistProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWishlistCount();

        displayWishlist();

        updateWishlistButtons();

    }
);