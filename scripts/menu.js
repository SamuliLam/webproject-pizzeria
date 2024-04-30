import {updateCartDisplay} from "./main.js";

const shoppingCart = [];
if (sessionStorage.getItem("shoppingCart") !== null) {
    shoppingCart.push(...JSON.parse(sessionStorage.getItem("shoppingCart")));
} else {
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

window.onload = async function() {
    try {
        const response = await fetch("http://10.120.32.55/app/api/v1/products");
        const data = await response.json();

        if (response.ok) {
            const categories = [...new Set(data.map(product => product.category))];

            categories.forEach(category => {
                const headerRow = document.createElement("div");
                headerRow.classList.add("menu-row", "menu-header");
                const headerNames = ["Name", "Description", "Price (€)", "Allergens", "Buy"];
                headerNames.forEach(name => {
                    const headerCell = document.createElement("div");
                    headerCell.classList.add("menu-cell");
                    headerCell.textContent = name;
                    headerRow.appendChild(headerCell);
                });

                const categoryList = getCategoryList(category);
                if (categoryList) {
                    categoryList.appendChild(headerRow);
                }

                data.filter(product => product.category.toLowerCase() === category.toLowerCase())
                    .forEach(product => {
                        const menuItem = document.createElement("div");
                        menuItem.classList.add("menu-row", "menu-item");

                        const cells = ["name", "description", "price", "allergens"];
                        cells.forEach(key => {
                            const cell = document.createElement("div");
                            cell.classList.add("menu-cell");
                            cell.textContent = product[key];
                            menuItem.appendChild(cell);
                        });

                        const orderButtonCell = document.createElement("div");
                        orderButtonCell.classList.add("menu-cell");
                        const orderButton = document.createElement("button");
                        orderButton.classList.add("cart-button");
                        orderButton.innerHTML = "&#x1F6D2;";
                        orderButton.addEventListener("click", function() {
                            shoppingCart.push(product)
                            sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                            updateCartDisplay();
                            console.log(shoppingCart)
                        });
                        orderButtonCell.appendChild(orderButton);
                        menuItem.appendChild(orderButtonCell);
                        if (categoryList) {
                            categoryList.appendChild(menuItem);
                        }
                    });
            });
        } else {
            console.error("Failed to fetch products:", data.error);
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};

function getCategoryList(category) {
    const lowercaseCategory = category.toLowerCase();
    switch (lowercaseCategory) {
        case "pizza":
            return document.getElementById("pizza-list");
        case "salad":
            return document.getElementById("salad-list");
        case "appetizer":
            return document.getElementById("appetizer-list");
        case "kebab":
            return document.getElementById("kebab-list");
        default:
            return null;
    }
}
