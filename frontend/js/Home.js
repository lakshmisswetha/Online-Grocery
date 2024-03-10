const allProducts = [
    {
        id: 1,
        name: "Apples",
        imageUrl: "../assets/apple.jpeg",
        rating: 4.5,
        price: 2.99,
    },
    {
        id: 2,
        name: "Whole Grain Bread",
        imageUrl: "../assets/bread.jpeg",
        rating: 4.0,
        price: 3.49,
    },
    {
        id: 3,
        name: "Fresh Spinach",
        imageUrl: "../assets/spinach.jpeg",
        rating: 4.2,
        price: 1.99,
    },
    {
        id: 4,
        name: "Greek Yogurt",
        imageUrl: "../assets/yogurt.jpeg",
        rating: 4.8,
        price: 2.79,
    },
    {
        id: 5,
        name: "Salmon",
        imageUrl: "../assets/salmon.jpeg",
        rating: 4.7,
        price: 9.99,
    },
    {
        id: 6,
        name: "Avocados",
        imageUrl: "../assets/avocado.avif",
        rating: 4.6,
        price: 1.49,
    },
    {
        id: 7,
        name: "Quinoa Pasta",
        imageUrl: "../assets/pasta.jpeg",
        rating: 4.3,
        price: 4.29,
    },
    {
        id: 8,
        name: "Berries Mix",
        imageUrl: "../assets/freshberry.jpeg",
        rating: 4.9,
        price: 5.99,
    },
    {
        id: 9,
        name: "Organic Kale",
        imageUrl: "../assets/kale.jpeg",
        rating: 4.4,
        price: 2.49,
    },
    {
        id: 10,
        name: "Almond Butter",
        imageUrl: "../assets/almondbutter.jpeg",
        rating: 4.5,
        price: 6.99,
    },
    {
        id: 11,
        name: "Chia Seeds",
        imageUrl: "../assets/chia.jpg",
        rating: 4.0,
        price: 3.99,
    },
    {
        id: 12,
        name: "Organic Eggs",
        imageUrl: "../assets/eggs.jpeg",
        rating: 4.6,
        price: 3.49,
    },
    {
        id: 13,
        name: "Sweet Potatoes",
        imageUrl: "../assets/sweetpot.jpeg",
        rating: 4.2,
        price: 1.89,
    },
    {
        id: 14,
        name: "Green Tea Bags",
        imageUrl: "../assets/gt.jpg",
        rating: 4.7,
        price: 2.99,
    },
    {
        id: 15,
        name: "Tomatoes",
        imageUrl: "../assets/tomato.jpeg",
        rating: 4.5,
        price: 2.69,
    },
    {
        id: 16,
        name: "Brown Rice",
        imageUrl: "../assets/rice.jpeg",
        rating: 4.1,
        price: 1.79,
    },
];

const body = document.querySelector(".body");
const message = document.querySelector(".response-message");

function displayProducts(allProducts) {
    const productHTML = allProducts
        .map(
            (product) => `
    <div class="product-card">
      <img class="product-image" src="${product.imageUrl}" alt="${product.name}">
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-rating">Rating: ${product.rating}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart-button" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `
        )
        .join("");

    body.innerHTML = productHTML;
}

//filter products from allproducts based on the search term given in search bar.implement search functionality
function filterProducts(searchTerm) {
    const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    displayProducts(filteredProducts);
}

//initially displays all products
displayProducts(allProducts);

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    allProducts.forEach((obj) => {
        if (obj.id == id) {
            cart.push({ id: id, name: obj.name, price: obj.price, img: obj.imageUrl });
        }
    });

    message.style.display = "flex";
    setTimeout(() => {
        message.style.display = "none";
    }, 1000);

    localStorage.setItem("cart", JSON.stringify(cart));
}

// function updateCartCount() {
//     const cartCount = cart.length;
//     const cartElement = document.querySelector(".mycart");

//     if (!notificationElement) {
//         notificationElement = document.createElement("span");
//         notificationElement.id = "cart-notification";
//         cartElement.appendChild(notificationElement);
//     }
//     notificationElement.style.display = cartCount > 0 ? "flex" : "none";
//     notificationElement.textContent =
//         cartCount > 0 ? cartCount : (notificationElement.style.display = "none");
// }

// updateCartCount();
