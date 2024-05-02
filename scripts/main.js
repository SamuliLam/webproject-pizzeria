const signupButton = document.getElementById('login-button')
const logOutButton = document.getElementById('logout-button')
const accountButton = document.getElementById('account-button')
const cartCount = document.getElementById('cart-count')

cartCount.textContent = sessionStorage.getItem('shoppingCart') ? JSON.parse(sessionStorage.getItem('shoppingCart')).length : 0

if (sessionStorage.getItem('token')) {
    signupButton.style.display = 'none'
    logOutButton.style.display = 'block'
    accountButton.style.display = 'block'
}

logOutButton.addEventListener('click', () => {
    sessionStorage.clear()
    signupButton.style.display = 'block'
    logOutButton.style.display = 'none'
    accountButton.style.display = 'none'
})

const hamburgerIcon = document.getElementById('hamburger-icon')
const sidebar = document.getElementById('side-bar')
hamburgerIcon.addEventListener('click', () => {
    sidebar.classList.toggle('show')
});


export const updateCartDisplay = () => {
    if (sessionStorage.getItem('shoppingCart')) {
        cartCount.textContent = JSON.parse(sessionStorage.getItem('shoppingCart')).length
    } else {
        cartCount.textContent = 0
    }
}

const shoppingCart = document.getElementById("shoppingCart");
const cartContent = document.getElementById("cartContent");

// Add click event listener to shopping cart image
shoppingCart.addEventListener("click", function() {
    // Toggle the visibility of the cart content
    if (cartContent.style.display === "block") {
        cartContent.style.display = "none";
    } else {
        cartContent.style.display = "block";
        // You can fetch and display the current shopping bag contents here
        displayCartContents();
    }
});

const cartProducts = document.getElementById("cartProducts");

const displayCartContents = () => {
    cartProducts.innerHTML = "";

    const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];
    console.log(shoppingCart)
    shoppingCart.forEach(product => {
        const mainProductContainer = document.createElement("div");
        mainProductContainer.classList.add("cart-product")
        const productContainer = document.createElement("div");
        productContainer.classList.add("cart-product")
        const productButtons = document.createElement("div");
        productButtons.classList.add("cart-buttons")
        const productName = document.createElement("span");
        productName.textContent = product.name;
        productContainer.appendChild(productName);

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.addEventListener("click", () => decreaseQuantity(product));
        productButtons.appendChild(minusButton);

        const productQuantity = document.createElement("span");
        productQuantity.textContent = 1; // Change this to the actual quantity of the product
        productButtons.appendChild(productQuantity);

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.addEventListener("click", () => increaseQuantity(product));
        productButtons.appendChild(plusButton);

        mainProductContainer.appendChild(productContainer);
        mainProductContainer.appendChild(productButtons);
        cartProducts.appendChild(mainProductContainer);

    });
};

const decreaseQuantity = (product) => {
    // Decrease quantity logic here
    // Example:
    // product.quantity -= 1;
    // Update shopping cart in session storage
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    // Update cart display
    displayCartContents();
};

const increaseQuantity = (product) => {
    // Increase quantity logic here
    // Example:
    // product.quantity += 1;
    // Update shopping cart in session storage
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    // Update cart display
    displayCartContents();
};

