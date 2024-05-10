'use strict';

const signupForm = document.getElementById("signupForm");
let message = document.querySelector("#status-message");
const currentLanguage = window.location.pathname.includes("/fi/") ? "_fi" : ""

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstName = signupForm.firstname.value;
    let lastName = signupForm.lastname.value;
    let email = signupForm.email.value;
    let phone = signupForm.phone.value;
    let address = signupForm.address.value;
    let password = signupForm.password.value;
    let confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
        message.innerHTML = "Passwords do not match";
        return;
    } else {
        await postSignup(firstName, lastName, email, address, phone, password);
    }
});

const postSignup = async (firstName, lastName, email, phone, address, password) => {
    try {
        const response = await fetch('https://10.120.32.55/app/api/v1/users', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                password: password,
                role: "user",
            })
        })
        const data = await response.json();
        if (response.status === 201) {
            message.innerHTML = data.message + ", redirecting..."
            setTimeout(() => {
                if (currentLanguage) {
                    window.location.href = `../fi/login_fi.html`;
                } else {
                    window.location.href = `../en/login.html`;
                }
            }, 2000);
        } else {
            message.innerHTML = data.message;
        }
    } catch (error) {
    }
}