'use strict';
import {getOrderItemsByOrderId, modifyOrderStatus} from "../api/fetchCalls.js";

export const orderComponent = (orders) => {
    const orderKeys = ["order_id", "Name", "order_date", "delivery_address", "status", "total_price", "phone", "email"];

    const headers = ["Order ID", "Customer Name", "Order Date", "Delivery Address", "Status", "Total Price", "Phone Number", "Email Address"];
    const table = createTable(orders, orderKeys, "Order Details", headers);

    const container = document.createElement("div");
    container.classList.add("order-container");
    container.appendChild(table);

    return container;
}

function createTable(orders, keys, title, headers) {
    const table = document.createElement("table");
    table.classList.add("order-table", "responsive-table");

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    orders.forEach(order => {
        const row = document.createElement("tr");

        const detailsContainer = document.createElement("tr");
        detailsContainer.style.display = "none";
        const detailsCell = document.createElement("td");
        detailsCell.colSpan = keys.length;
        detailsContainer.appendChild(detailsCell);

        table.appendChild(row);
        table.appendChild(detailsContainer);

        keys.forEach(key => {
            const td = document.createElement("td");
            td.setAttribute("data-label", key);
            if (key === "order_id") {
                td.textContent = order[key];
                td.addEventListener("click", async () => {
                    const detailsContainer = row.nextElementSibling;
                    detailsContainer.style.display = detailsContainer.style.display === "none" ? "" : "none";
                    if (detailsContainer.style.display !== "none") {
                        const items = await getOrderItemsByOrderId(order[key]);
                        const itemCounts = countItems(items);
                        detailsContainer.textContent = ""; // Clear the previous content
                        const header = document.createElement("h3");
                        header.textContent = "Ordered Items";
                        detailsContainer.appendChild(header);
                        const itemsText = document.createElement("p");
                        itemsText.textContent = formatItemCounts(itemCounts);
                        detailsContainer.appendChild(itemsText);
                    }
                });
            } else if (key === "Name") {
                const button = document.createElement("button");
                button.classList.add("customer-name-button");
                button.textContent = `${order.first_name} ${order.last_name}`;
                td.appendChild(button);
            } else if (key === "order_date") {
                const date = new Date(order[key]);
                const dateOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
                const timeOptions = {hour: '2-digit', minute: '2-digit', second: '2-digit'};
                td.textContent = `${date.toLocaleDateString('fi-FI', dateOptions)} ${date.toLocaleTimeString('en-GB', timeOptions)}`;
            } else if (key === "status") {
                const select = document.createElement("select");
                ["preparing", "being delivered", "delivered"].forEach(status => {
                    const option = document.createElement("option");
                    option.value = status;
                    option.text = status;
                    if (status === order[key]) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                td.appendChild(select);
            } else {
                td.textContent = order[key];
            }
            row.appendChild(td);
        });

        const updateButtonTd = document.createElement("td");
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", async () => {
            const statusMessage = document.getElementById("status-message");
            const fetchStatus = await modifyOrderStatus(order.order_id, row.querySelector("select").value);
            if (fetchStatus === 200) {
                statusMessage.style.color = "green";
                statusMessage.textContent = "Order updated";
            } else {
                statusMessage.style.color = "red";
                statusMessage.textContent = "Failed to update order";
            }
        });
        updateButtonTd.appendChild(updateButton);
        row.appendChild(updateButtonTd);

        table.appendChild(row);
    });

    const tableTitle = document.createElement("h2");
    tableTitle.textContent = title;

    return table;
}


function countItems(items) {
    const counts = new Map();
    for (const item of items) {
        const count = counts.get(item.name) || 0;
        counts.set(item.name, count + 1);
    }
    return counts;
}

function formatItemCounts(counts) {
    let text = "";
    for (const [name, count] of counts) {
        if (text !== "") text += ", ";
        text += `${name}: ${count}`;
    }
    return text;
}