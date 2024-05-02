'use strict';

const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
console.log(shoppingCart);

const createUserData = (user) => {
    editForm.firstName.placeholder = user.first_name;
    editForm.lastName.placeholder = user.last_name;
    editForm.email.placeholder = user.email;
    editForm.phone.placeholder = user.phone;
    editForm.address.placeholder = user.address;
    editForm.password.placeholder = "********";
    editForm.confirmPassword.placeholder = "********";
}
const editForm = document.querySelector('.edit-form');
const user = JSON.parse(sessionStorage.getItem('user'));

if (!user) {
    window.location.href = 'index.html';
} else {
    createUserData(user);
}

const saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', async (e) => {
    e.preventDefault()
    //TODO handle form validation
})
