export const menuComponent = (menu) => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const menuTitle = document.createElement("h2");
    menuTitle.textContent = "Manage your menu";
    menuContainer.appendChild(menuTitle);

    const addMenuItemButton = document.createElement("button");
    addMenuItemButton.classList.add("add-menu-item-button");
    addMenuItemButton.textContent = "Add menu item";
    menuContainer.appendChild(addMenuItemButton);

    const headers = ["Id", "Name", "Description", "Price", "Category"];

    const menuTable = createTable(menu, headers);
    menuContainer.appendChild(menuTable);

    return menuContainer;
}

function createTable(menu, headers){
    const menuTable = document.createElement("table");
    menuTable.classList.add("menu-table", "responsive-table");

    const thead = document.createElement("thead");
    menuTable.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    menu.forEach(menuItem => {
        const row = document.createElement("tr");
        menuTable.appendChild(row);

        headers.forEach(header => {
            const td = document.createElement("td");
            td.setAttribute("data-label", header);
            td.textContent = menuItem[header];
            row.appendChild(td);
        });
    });

    return menuTable;
}