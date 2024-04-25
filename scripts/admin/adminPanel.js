import {getOrders, getProducts} from "../api/fetchCalls.js";
import {orderComponent, menuComponent} from "./components.js";

const adminContentContainer = document.getElementById("admin-content-container");

async function loadOrders() {
    const orders = await getOrders();
    adminContentContainer.appendChild(orderComponent(orders));
}

async function loadProducts() {
    const products = await getProducts();
    adminContentContainer.appendChild(menuComponent(products));
}

const manageOrdersButton = document.getElementById("manage-orders");
const manageMenuButton = document.getElementById("manage-menu");

manageOrdersButton.addEventListener("click", () => {
    adminContentContainer.innerHTML = "";
    loadOrders();
});

manageMenuButton.addEventListener("click", () => {
    adminContentContainer.innerHTML = "";
    loadProducts();
});