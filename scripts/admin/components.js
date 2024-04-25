'use strict';

export const orderComponent = (orders) => {
    const orderKeys = ["order_id", "Name", "order_date", "delivery_address", "status", "total_price", "phone", "email"];

    const table = createTable(orders, orderKeys, "Order Details");

    const container = document.createElement("div");
    container.classList.add("order-container");
    container.appendChild(table);

    return container;
}

function createTable(orders, keys, title) {
    const table = document.createElement("table");
    table.classList.add("order-table", "responsive-table");

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    orders.forEach(order => {
        const row = document.createElement("tr");

        keys.forEach(key => {
            const td = document.createElement("td");
            td.setAttribute("data-label", key);
            if (key === "Name") {
                const button = document.createElement("button");
                button.textContent = `${order.first_name} ${order.last_name}`;
                td.appendChild(button);
            } else {
                td.textContent = order[key];
            }
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    const tableTitle = document.createElement("h2");
    tableTitle.textContent = title;

    const tableContainer = document.createElement("div");
    tableContainer.appendChild(tableTitle);
    tableContainer.appendChild(table);

    return tableContainer;
}

export const menuComponent = (menu) => {
    const table = document.createElement("table");
    table.classList.add("menu-table");

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    const headerNames = ["Pizza Name", "Description", "Price (€)", "Allergens"];
}
