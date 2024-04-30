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