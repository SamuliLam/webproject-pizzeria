'use strict';

let message = document.querySelector("#message");

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = loginForm.email.value;
    let password = loginForm.password.value;
    postLogin(email, password)

})

const postLogin = async (email, password) => {
    try {
        const response = await fetch('http://10.120.32.55/app/api/v1/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", data.user);
            message.innerHTML = data.message + ", redirecting..."
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            message.innerHTML = data.message;
        }
    } catch (error) {
    }
}