import {authenticateAdmin} from "./api/fetchCalls.js";

const signupButton = document.getElementById('login-button')
const logOutButton = document.getElementById('logout-button')
const accountButton = document.getElementById('account-button')
const cartCount = document.getElementById('cart-count')

cartCount.textContent = sessionStorage.getItem('shoppingCart') ? JSON.parse(sessionStorage.getItem('shoppingCart')).length : 0


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
        cartCount.textContent = JSON.parse(sessionStorage.getItem('shoppingCart')).length
    } else {
        cartCount.textContent = 0
    }
}