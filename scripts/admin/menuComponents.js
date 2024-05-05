import {updateProduct, createProduct, deleteProduct} from "../api/fetchCalls.js";
export const menuComponent = (menu) => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("menu-button-container");
    menuContainer.appendChild(buttonContainer);

    const addMenuItemButton = document.createElement("button");
    addMenuItemButton.classList.add("menu-header-button");
    addMenuItemButton.id = "add-menu-item-button";
    addMenuItemButton.textContent = "Add menu item";
    buttonContainer.appendChild(addMenuItemButton);

    addMenuItemButton.addEventListener('click', () => {
        menuContainer.innerHTML = '';
        menuContainer.appendChild(addMenuItemForm());
    });


    const headers = ["Id", "Name", "Description", "Price", "Category", "Allergens"];

    const menuTable = createTable(menu, headers);
    menuContainer.appendChild(menuTable);

    return menuContainer;
}

function createTable(menu, headers){

    const menuTableContainer = document.createElement("div");
    menuTableContainer.classList.add("menu-table-container");
    const menuTable = document.createElement("table");
    menuTable.classList.add("menu-table", "responsive-menu-table");
    menuTableContainer.appendChild(menuTable);

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

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const updateButton = document.createElement("button");
        updateButton.classList.add("edit-menu-item-button");
        updateButton.textContent = "Update";
        updateButton.dataset.productId = menuItem.id;
        buttonContainer.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("edit-menu-item-button");
        deleteButton.textContent = "Remove";
        deleteButton.dataset.productId = menuItem.id;
        buttonContainer.appendChild(deleteButton);

        Object.keys(menuItem).forEach(key => {
            const td = document.createElement("td");

            if (key === "id") {
                td.textContent = menuItem[key];
            } else {
                const input = document.createElement("input");
                input.value = menuItem[key];
                input.classList.add("admin-content-input");
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

        deleteButton.addEventListener('click', async () => {
            const productId = deleteButton.dataset.productId;
            const response = await deleteProduct(productId, sessionStorage.getItem('token'));
            const stausMessage = document.getElementById('status-message');

            if (response === 200) {
                const row = deleteButton.parentElement.parentElement;
                stausMessage.textContent = 'Product removed';
                stausMessage.style.color = 'green';
                row.remove();
            }
        });

        row.appendChild(buttonContainer);
    });

    return menuTableContainer;
}

const addMenuItemForm = () => {
    const form = document.createElement("form");
    form.classList.add("menu-item-form");

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    form.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    form.appendChild(nameInput);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description";
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.name = "description";
    form.appendChild(descriptionInput);

    const priceLabel = document.createElement("label");
    priceLabel.textContent = "Price";
    form.appendChild(priceLabel);

    const priceInput = document.createElement("input");
    priceInput.type = "text";
    priceInput.name = "price";
    form.appendChild(priceInput);

    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Category";
    form.appendChild(categoryLabel);

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.name = "category";
    form.appendChild(categoryInput);

    const allergensLabel = document.createElement("label");
    allergensLabel.textContent = "Allergens";
    form.appendChild(allergensLabel);

    const allergensInput = document.createElement("input");
    allergensInput.type = "text";
    allergensInput.name = "allergens";
    form.appendChild(allergensInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const product = {
            name: nameInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            category: categoryInput.value,
            allergens: allergensInput.value.split(',').map(allergen => ({name: allergen.trim()}))
        };

        console.log(product)

        const token = sessionStorage.getItem('token');

        const response = await createProduct(product, token);
        const statusMessage = document.getElementById('status-message');

        if (response === 201) {
            console.log('Product created');
            statusMessage.textContent = 'Product created';
            statusMessage.style.color = 'green';
        } else {
            console.log('Product not created');
            statusMessage.textContent = 'Product not created';
            statusMessage.style.color = 'red';
        }
    });

    return form;
}