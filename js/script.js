// ===========================
// YONICk SCRIPT.JS
// ===========================

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // Display all products if products.js is loaded
    if (typeof displayProducts === "function") {
        displayProducts(products);
    }

    // Update cart count if cart.js is loaded
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

});


// ===========================
// SEARCH
// ===========================

function searchProduct() {

    let text = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    displayProducts(filtered);
}


// ===========================
// CATEGORY FILTER
// ===========================

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        let filtered = products.filter(product =>
            product.category === category
        );

        displayProducts(filtered);

    }

}


// ===========================
// HERO BUTTON
// ===========================

const heroButton = document.querySelector(".hero button");

if (heroButton) {

    heroButton.addEventListener("click", function () {

        document.querySelector(".products").scrollIntoView({

            behavior: "smooth"

        });

    });

}