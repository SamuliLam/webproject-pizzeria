'use strict';

import { postOrder } from "./api/fetchCalls.js";

let user, shoppingCart, orderForm;

const createUserData = (user) => {
    orderForm = document.getElementById("order-form");
    orderForm.firstname.value = user.first_name;
    orderForm.lastname.value = user.last_name;
    orderForm.email.value = user.email;
    orderForm.phone.value = user.phone;
    orderForm.address.value = user.address;
}

const createOrderOverview = (shoppingCart) => {
    const orderSummaryDiv = document.querySelector(".order-summary")

    const orderSummaryTable = document.createElement("table");
    orderSummaryTable.classList.add("order-summary-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const orderSummaryHeader = document.createElement("th");
    orderSummaryHeader.textContent = "Order Summary";

    orderSummaryDiv.appendChild(orderSummaryTable);
    orderSummaryTable.appendChild(thead);
    thead.appendChild(headerRow);
    headerRow.appendChild(orderSummaryHeader);

    const tbody = document.createElement("tbody");
    shoppingCart.forEach(item => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = "Name: " + item.name;
        tr.appendChild(tdName);

        const tdQuantity = document.createElement("td");
        tdQuantity.textContent = "Quantity; " + item.quantity;
        tr.appendChild(tdQuantity);

        const tdPrice = document.createElement("td");
        tdPrice.textContent = "Price: " + item.price;
        tr.appendChild(tdPrice);

        tbody.appendChild(tr);
    });
    const totalPriceRow = document.createElement("tr");
    totalPriceRow.classList.add("order-summary-total-price");

    const totalPriceCell = document.createElement("td");
    totalPriceCell.textContent = "Total price: " + shoppingCart.reduce((acc, item) => acc + parseFloat(item.price), 0) + "\u20AC";

    totalPriceRow.appendChild(totalPriceCell); tbody.appendChild(totalPriceRow);
    orderSummaryTable.appendChild(tbody);

    const orderButton = document.createElement("button");
    orderButton.textContent = "Order";
    orderButton.addEventListener("click", async () => {
        //TODO: Add order to database
    });
    orderSummaryDiv.appendChild(orderButton);
}

if (!sessionStorage.getItem("token")) {
    window.location.href = "../index.html";
} else {
    user = JSON.parse(sessionStorage.getItem('user'));
    shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    createUserData(user);
    createOrderOverview(shoppingCart)
}
