'use strict';

import {postLogin} from "./api/fetchCalls.js";

const loginForm = document.getElementById("loginForm");
let message = document.querySelector("#status-message");

const handleResponse = async (data) => {
    const currentLanguage = window.location.pathname.includes("/fi/") ? "_fi" : ""
    if (data.status === 200) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        if (currentLanguage) {
            message.innerHTML = "Kirjautuminen onnistui, ohjataan..."
        } else {
            message.innerHTML = data.message + ", redirecting..."
        }

        const intendedDestination = sessionStorage.getItem("intendedDestination");
        if (intendedDestination) {
            setTimeout(() => {
                window.location.href = intendedDestination;
            }, 2000);
            sessionStorage.removeItem("intendedDestination");
        } else {
            setTimeout(() => {
                if (currentLanguage) {
                    window.location.href = `../fi/index_fi.html`;
                } else {
                    window.location.href = `../en/index.html`;
                }
            }, 2000);
        }
    } else {
        if (currentLanguage) {
            message.innerHTML = "Sähköposti tai salasana ei täsmää"
        }
        message.innerHTML = data.message;
    }
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = loginForm.email.value;
    let password = loginForm.password.value;
    postLogin(email, password).then(data => handleResponse(data));
});