// ==========================================
// YONICk SCRIPT
// ==========================================

let currentCategory = "All";


// ==========================================
// LOAD WISHLIST
// ==========================================

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProducts(products);

        updateCartCount();

        updateWishlistCount();

        setupSearch();

        setupPriceFilter();

        setupSorting();

        setupHeroButton();

    }
);


// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const searchInput =
        document.getElementById("search");

    const clearButton =
        document.getElementById("clear-search");


    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        function () {

            applyFilters();

        }
    );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                searchInput.value = "";

                applyFilters();

            }
        );

    }

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

    currentCategory = category;


    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(button => {

        if (
            button.textContent
                .toLowerCase()
                .includes(
                    category.toLowerCase()
                )
            ||
            (
                category === "All"
                &&
                button.textContent.includes("All")
            )
        ) {

            button.classList.add("active");

        }

    });


    applyFilters();

}


// ==========================================
// PRICE FILTER
// ==========================================

function setupPriceFilter() {

    const priceFilter =
        document.getElementById(
            "price-filter"
        );

    const priceValue =
        document.getElementById(
            "price-value"
        );


    if (!priceFilter) return;


    priceFilter.addEventListener(
        "input",
        function () {

            const price =
                Number(this.value);


            if (priceValue) {

                priceValue.textContent =
                    "₹" +
                    price.toLocaleString(
                        "en-IN"
                    );

            }


            applyFilters();

        }
    );

}


// ==========================================
// SORTING
// ==========================================

function setupSorting() {

    const sortSelect =
        document.getElementById(
            "sort-products"
        );


    if (!sortSelect) return;


    sortSelect.addEventListener(
        "change",
        function () {

            applyFilters();

        }
    );

}


// ==========================================
// APPLY ALL FILTERS
// ==========================================

function applyFilters() {

    const searchInput =
        document.getElementById("search");

    const priceFilter =
        document.getElementById(
            "price-filter"
        );

    const sortSelect =
        document.getElementById(
            "sort-products"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const maxPrice =
        priceFilter
            ? Number(priceFilter.value)
            : Infinity;


    const sortType =
        sortSelect
            ? sortSelect.value
            : "default";


    // FILTER

    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                currentCategory === "All"
                ||
                product.category ===
                    currentCategory;


            const matchesPrice =
                product.price <= maxPrice;


            return (
                matchesSearch
                &&
                matchesCategory
                &&
                matchesPrice
            );

        });


    // SORT

    if (sortType === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sortType === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sortType === "az") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    if (sortType === "za") {

        filtered.sort(
            (a, b) =>
                b.name.localeCompare(
                    a.name
                )
        );

    }


    displayProducts(filtered);

}


// ==========================================
// RESET FILTERS
// ==========================================

function resetFilters() {

    currentCategory = "All";


    const searchInput =
        document.getElementById(
            "search"
        );

    const priceFilter =
        document.getElementById(
            "price-filter"
        );

    const priceValue =
        document.getElementById(
            "price-value"
        );

    const sortSelect =
        document.getElementById(
            "sort-products"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    if (priceFilter) {

        priceFilter.value = 200000;

    }


    if (priceValue) {

        priceValue.textContent =
            "₹2,00,000";

    }


    if (sortSelect) {

        sortSelect.value =
            "default";

    }


    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const allButton =
        document.querySelector(
            ".category-btn"
        );


    if (allButton) {

        allButton.classList.add(
            "active"
        );

    }


    displayProducts(products);

}


// ==========================================
// HERO BUTTON
// ==========================================

function setupHeroButton() {

    const heroButton =
        document.getElementById(
            "shop-now"
        );


    if (!heroButton) return;


    heroButton.addEventListener(
        "click",
        function () {

            const productSection =
                document.querySelector(
                    ".product-heading"
                );


            if (productSection) {

                productSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(id) {

    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) return;


    const existingIndex =
        wishlist.findIndex(
            item =>
                item.id === id
        );


    if (existingIndex !== -1) {

        wishlist.splice(
            existingIndex,
            1
        );


        showCartMessage(
            product.name +
            " removed from wishlist"
        );

    } else {

        wishlist.push(product);


        showCartMessage(
            product.name +
            " added to wishlist ❤️"
        );

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();


    // Refresh product cards

    applyFilters();

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