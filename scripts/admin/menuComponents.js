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

    const headers = ["Id", "Name", "Description", "Price", "Category", "Allergens"];

    const menuTable = createTable(menu, headers);
    menuContainer.appendChild(menuTable);

    return menuContainer;
}

function createTable(menu, headers){
    const menuTable = document.createElement("table");
    menuTable.classList.add("menu-table", "responsive-menu-table");

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

        const updateButton = document.createElement("button");
        updateButton.classList.add("update-menu-item-button");
        updateButton.textContent = "Update";

        Object.keys(menuItem).forEach(key => {
            const td = document.createElement("td");

            if (key === "id") {
                td.textContent = menuItem[key];
            } else {
                const input = document.createElement("input");
                input.value = menuItem[key];
                input.classList.add("menu-input");
                td.appendChild(input);

                if (key === "allergens") {
                    const allergens = menuItem[key].map(allergen => allergen.name).join(", ");
                    input.value = allergens;
                }
            }

            row.appendChild(td);
        });

        row.appendChild(updateButton);
    });

    return menuTable;
}