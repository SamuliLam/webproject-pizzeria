'use strict';

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

        keys.forEach(key => {
            const td = document.createElement("td");
            td.setAttribute("data-label", key);
            if (key === "Name") {
                const button = document.createElement("button");
                button.classList.add("customer-name-button");
                button.textContent = `${order.first_name} ${order.last_name}`;
                td.appendChild(button);
            } else if (key === "order_date") {
                const date = new Date(order[key]);
                const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                td.textContent = `${date.toLocaleDateString('en-GB', dateOptions)} ${date.toLocaleTimeString('en-GB', timeOptions)}`;
            } else {
                td.textContent = order[key];
            }
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    const tableTitle = document.createElement("h2");
    tableTitle.textContent = title;

    return table;
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
