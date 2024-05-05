import {getOrders, getProducts, getUsers} from "../api/fetchCalls.js";
import {orderComponent} from "./orderComponents.js";
import {menuComponent} from "./menuComponents.js";
import {userComponent} from "./userComponents.js";

const adminContentContainer = document.getElementById("admin-content-container");

async function loadOrders() {
    const orders = await getOrders();
    adminContentContainer.appendChild(orderComponent(orders));
}

async function loadProducts() {
    const products = await getProducts();
    adminContentContainer.appendChild(menuComponent(products));
}

async function loadUsers() {
    const users = await getUsers();
    adminContentContainer.appendChild(userComponent(users));
}

const manageOrdersButton = document.getElementById("manage-orders");
const manageMenuButton = document.getElementById("manage-menu");
const manageUsersButton = document.getElementById("manage-users");

manageOrdersButton.addEventListener("click", async() => {
    adminContentContainer.innerHTML = "";
    await loadOrders();
});

manageMenuButton.addEventListener("click", async() => {
    adminContentContainer.innerHTML = "";
    await loadProducts();
});

manageUsersButton.addEventListener("click", async() => {
    adminContentContainer.innerHTML = "";
    await loadUsers();
});