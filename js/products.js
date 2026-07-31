// ===========================
// YONICk PRODUCTS DATABASE
// ===========================

const products = [
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
    name: "MacBook Pro M4",
    category: "Laptop",
    price: 200000,
    image: "images/laptop.jpg"
},
{
    id: 4,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 60000,
    image: "images/headphones.jpg"
}
];

// ===========================
// DISPLAY PRODUCTS
// ===========================

function displayProducts(items) {

    const container = document.querySelector(".products");

    if (!container) return;

    container.innerHTML = "";

    items.forEach(product => {

        container.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>₹${product.price.toLocaleString("en-IN")}</strong></p>
            <button onclick="addCart(${product.id})">
                🛒 Add to Cart
            </button>
        </div>
        `;
    });

}