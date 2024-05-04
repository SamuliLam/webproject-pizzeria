import {authenticateAdmin} from "./api/fetchCalls.js";

const signupButton = document.getElementById('login-button')
const logOutButton = document.getElementById('logout-button')
const accountButton = document.getElementById('account-button')
const cartCount = document.getElementById('cart-count')

// const productCount = JSON.parse(sessionStorage.getItem('shoppingCart')) || []
// cartCount.textContent = productCount.reduce((acc, product) => acc + product.quantity, 0).toString();




if (sessionStorage.getItem('token')) {
    signupButton.style.display = 'none'
    logOutButton.style.display = 'block'
    accountButton.style.display = 'block'

    await accessAdminPanel(sessionStorage.getItem('token'))
}

async function accessAdminPanel(token) {
    const isAdmin = await authenticateAdmin(token);
    const navLinks = document.getElementById('main-nav-links');

    if (isAdmin) {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.textContent = 'ADMIN PANEL';

        navLinks.appendChild(adminLink);
        console.log('Access granted to admin panel');
    }
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
        const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'))
        cartCount.textContent = shoppingCart.reduce((acc, product) => acc + product.quantity, 0).toString();
    } else {
        cartCount.textContent = 0
    }
}

const shoppingCart = document.getElementById("shoppingCart");
const cartContent = document.getElementById("cartContent");

cartContent.style.display = "none";

shoppingCart.addEventListener("click", function() {
    if (sessionStorage.getItem("shoppingCart") === null || JSON.parse(sessionStorage.getItem("shoppingCart")).length === 0) {
        cartContent.style.display = "none";
    } else {
        cartContent.style.display = cartContent.style.display === "none" ? "block" : "none";
        displayCartContents();
    }
});

const cartProducts = document.getElementById("cartProducts");

const displayCartContents = () => {
    while (cartProducts.firstChild) {
        cartProducts.removeChild(cartProducts.firstChild);
    }
    const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];
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
        minusButton.addEventListener("click", () => {
            if (product.quantity > 0) {
                product.quantity--;
                sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            }

            if (product.quantity === 0) {
                const index = shoppingCart.indexOf(product);
                if (index !== -1) {
                    shoppingCart.splice(index, 1);
                }
                productButtons.remove();
                mainProductContainer.remove()
                sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            }

            productQuantity.textContent = product.quantity;
            sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

            if (shoppingCart.length === 0) {
                cartContent.style.display = "none";
                const checkoutButton = document.querySelector(".proceed-to-checkout-button");
                if (checkoutButton) {
                    checkoutButton.parentElement.remove();
                }
            }

            updateCartDisplay();
        })
        productButtons.appendChild(minusButton);

        const productQuantity = document.createElement("span");
        productQuantity.textContent = product.quantity;
        productButtons.appendChild(productQuantity);

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";

        productButtons.appendChild(plusButton);
        plusButton.addEventListener("click", () => {
            product.quantity++
            productQuantity.textContent = product.quantity;
            sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            updateCartDisplay();
        });

        mainProductContainer.appendChild(productContainer);
        mainProductContainer.appendChild(productButtons);
        cartProducts.appendChild(mainProductContainer);

    });
    if (shoppingCart.length > 0) {
        const proceedToCheckoutButton = document.createElement("button");
        proceedToCheckoutButton.textContent = "Proceed to Checkout";
        proceedToCheckoutButton.classList.add("proceed-to-checkout-button");
        proceedToCheckoutButton.addEventListener("click", () => {
            if (sessionStorage.getItem("token")) {
                window.location.href = "checkout.html";
            } else {
                window.location.href = "login.html";
            }
        });

        const bottomContainer = document.createElement("div");
        bottomContainer.classList.add("proceed-to-checkout-container");
        bottomContainer.appendChild(proceedToCheckoutButton);
        cartProducts.appendChild(bottomContainer);
    }
};

updateCartDisplay()