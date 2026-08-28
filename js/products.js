// ==========================================
// YONICk PRODUCT DATABASE
// ==========================================

const products = [

    // =========================
    // MOBILES
    // =========================

    {
        id: 1,
        name: "iPhone 16",
        category: "Mobile",
        price: 79999,
        image: "images/iphone.jpg"
    },

    {
        id: 2,
        name: "Samsung Galaxy S25 Ultra",
        category: "Mobile",
        price: 119999,
        image: "images/iphone.jpg"
    },

    {
        id: 3,
        name: "OnePlus 13",
        category: "Mobile",
        price: 69999,
        image: "images/iphone.jpg"
    },

    {
        id: 4,
        name: "Google Pixel 9",
        category: "Mobile",
        price: 74999,
        image: "images/iphone.jpg"
    },

    {
        id: 5,
        name: "Samsung Galaxy A56",
        category: "Mobile",
        price: 39999,
        image: "images/iphone.jpg"
    },


    // =========================
    // LAPTOPS
    // =========================

    {
        id: 6,
        name: "MacBook Pro M4",
        category: "Laptop",
        price: 149999,
        image: "images/laptop.jpg"
    },

    {
        id: 7,
        name: "MacBook Air M3",
        category: "Laptop",
        price: 99999,
        image: "images/laptop.jpg"
    },

    {
        id: 8,
        name: "Dell Inspiron 15",
        category: "Laptop",
        price: 64999,
        image: "images/laptop.jpg"
    },

    {
        id: 9,
        name: "HP Pavilion 14",
        category: "Laptop",
        price: 59999,
        image: "images/laptop.jpg"
    },

    {
        id: 10,
        name: "ASUS VivoBook 15",
        category: "Laptop",
        price: 54999,
        image: "images/laptop.jpg"
    },


    // =========================
    // AUDIO
    // =========================

    {
        id: 11,
        name: "Sony WH-1000XM5",
        category: "Audio",
        price: 29999,
        image: "images/headphones.jpg"
    },

    {
        id: 12,
        name: "Apple AirPods Pro",
        category: "Audio",
        price: 24999,
        image: "images/headphones.jpg"
    },

    {
        id: 13,
        name: "Samsung Galaxy Buds 3",
        category: "Audio",
        price: 14999,
        image: "images/headphones.jpg"
    },

    {
        id: 14,
        name: "JBL Tune 770NC",
        category: "Audio",
        price: 6999,
        image: "images/headphones.jpg"
    },

    {
        id: 15,
        name: "Boat Rockerz 550",
        category: "Audio",
        price: 1999,
        image: "images/headphones.jpg"
    },


    // =========================
    // GAMING
    // =========================

    {
        id: 16,
        name: "PlayStation 5",
        category: "Gaming",
        price: 54999,
        image: "images/laptop.jpg"
    },

    {
        id: 17,
        name: "Xbox Series X",
        category: "Gaming",
        price: 52999,
        image: "images/laptop.jpg"
    },

    {
        id: 18,
        name: "Gaming Keyboard RGB",
        category: "Gaming",
        price: 3499,
        image: "images/headphones.jpg"
    },

    {
        id: 19,
        name: "Gaming Mouse RGB",
        category: "Gaming",
        price: 1999,
        image: "images/headphones.jpg"
    },

    {
        id: 20,
        name: "Gaming Headset",
        category: "Gaming",
        price: 4999,
        image: "images/headphones.jpg"
    },


    // =========================
    // FASHION
    // =========================

    {
        id: 21,
        name: "Premium Sneakers",
        category: "Fashion",
        price: 3999,
        image: "images/laptop.jpg"
    },

    {
        id: 22,
        name: "Classic Running Shoes",
        category: "Fashion",
        price: 2999,
        image: "images/laptop.jpg"
    },

    {
        id: 23,
        name: "Premium Hoodie",
        category: "Fashion",
        price: 1999,
        image: "images/laptop.jpg"
    },

    {
        id: 24,
        name: "Oversized T-Shirt",
        category: "Fashion",
        price: 999,
        image: "images/laptop.jpg"
    },

    {
        id: 25,
        name: "Denim Jacket",
        category: "Fashion",
        price: 2499,
        image: "images/laptop.jpg"
    },


    // =========================
    // ELECTRONICS
    // =========================

    {
        id: 26,
        name: "Smart LED TV",
        category: "Electronics",
        price: 45999,
        image: "images/laptop.jpg"
    },

    {
        id: 27,
        name: "Smart Watch",
        category: "Electronics",
        price: 5999,
        image: "images/iphone.jpg"
    },

    {
        id: 28,
        name: "Power Bank 20000mAh",
        category: "Electronics",
        price: 1999,
        image: "images/headphones.jpg"
    },

    {
        id: 29,
        name: "Wireless Charger",
        category: "Electronics",
        price: 1499,
        image: "images/headphones.jpg"
    },

    {
        id: 30,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 2999,
        image: "images/headphones.jpg"
    }

];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(items) {

    const container =
        document.querySelector(".products");

    const noProducts =
        document.getElementById("no-products");

    const productCount =
        document.getElementById("product-count");


    if (!container) return;


    container.innerHTML = "";


    // PRODUCT COUNT

    if (productCount) {

        productCount.textContent =
            items.length;

    }


    // NO PRODUCTS

    if (items.length === 0) {

        if (noProducts) {

            noProducts.style.display =
                "block";

        }

        return;

    }


    if (noProducts) {

        noProducts.style.display =
            "none";

    }


    // ==========================================
    // CREATE PRODUCT CARDS
    // ==========================================

    items.forEach(product => {

        const isWishlisted =
            wishlist.some(
                item => item.id === product.id
            );


        container.innerHTML += `

            <div
                class="product-card"
                onclick="openProduct(${product.id})"
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


                    <!-- WISHLIST -->

                    <button
                        class="wishlist-btn ${
                            isWishlisted
                                ? "wishlisted"
                                : ""
                        }"
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

                </div>

            </div>

        `;

    });

}


// ==========================================
// OPEN PRODUCT DETAILS
// ==========================================

function openProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}