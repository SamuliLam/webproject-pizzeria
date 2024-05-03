import {updateProduct} from "../api/fetchCalls.js";
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

    const changedInputs = {};

    menu.forEach(menuItem => {
        const row = document.createElement("tr");
        menuTable.appendChild(row);

        const updateButton = document.createElement("button");
        updateButton.classList.add("update-menu-item-button");
        updateButton.textContent = "Update";

        updateButton.dataset.productId = menuItem.id;

        Object.keys(menuItem).forEach(key => {
            const td = document.createElement("td");

            if (key === "id") {
                td.textContent = menuItem[key];
            } else {
                const input = document.createElement("input");
                input.value = menuItem[key];
                input.classList.add("menu-input");
                input.id = `${menuItem.id}-${key}`;
                td.appendChild(input);

                if (key === "allergens") {
                    const allergens = menuItem[key].map(allergen => allergen.name).join(", ");
                    input.value = allergens;
                }

                input.addEventListener('change', () => {
                    changedInputs[input.id] = input.value;
                    console.log(changedInputs);
                });

            }

            row.appendChild(td);
        });

        updateButton.addEventListener('click', async () => {
            // Populate the changesByProductId object inside the click event listener
            const changesByProductId = {};
            for (const key in changedInputs) {
                const [productId, property] = key.split('-');
                if (!changesByProductId[productId]) {
                    changesByProductId[productId] = {};
                }
                changesByProductId[productId][property] = changedInputs[key];
            }

            const productId = updateButton.dataset.productId;
            const changedProduct = changesByProductId[productId];

            const user = JSON.parse(sessionStorage.getItem('user'));
            console.log('user', user)
            console.log('changed product', changedProduct);
            await updateProduct(productId, changedProduct, sessionStorage.getItem('token'));
        });

        row.appendChild(updateButton);
    });

    return menuTable;
}