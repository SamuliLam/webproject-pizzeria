'use strict';

let user, shoppingCart, orderForm;

const createFormData = (user) => {
    orderForm = document.getElementById("order-form");
    orderForm.firstname.value = user.first_name;
    orderForm.lastname.value = user.last_name;
    orderForm.email.value = user.email;
    orderForm.phone.value = user.phone;
    orderForm.address.value = user.address;
}
if (!sessionStorage.getItem("token")) {
    window.location.href = "../index.html";
} else {
    user = JSON.parse(sessionStorage.getItem('user'));
    shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    createFormData(user);
}
