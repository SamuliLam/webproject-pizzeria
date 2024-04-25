window.onload = async function() {
    try {
        const response = await fetch("http://10.120.32.55/app/api/v1/products");
        const data = await response.json();

        if (response.ok) {
            data.forEach(product => {
                // Create menu item element
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-row", "menu-item");

                // Create and append cells for each product detail
                const cells = ["name", "description", "price", "allergens"];
                cells.forEach(key => {
                    const cell = document.createElement("div");
                    cell.classList.add("menu-cell");
                    cell.textContent = product[key];
                    menuItem.appendChild(cell);
                });

                // Create and append the order button
                const orderButtonCell = document.createElement("div");
                orderButtonCell.classList.add("menu-cell");
                const orderButton = document.createElement("button");
                orderButton.classList.add("cart-button");
                orderButton.innerHTML = "&#x1F6D2;";
                orderButtonCell.appendChild(orderButton);
                menuItem.appendChild(orderButtonCell);

                // Append the menu item to the corresponding category div
                const categoryList = getCategoryList(product.category);
                if (categoryList) {
                    categoryList.appendChild(menuItem);
                }
            });
        } else {
            console.error("Failed to fetch products:", data.error);
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};

function getCategoryList(category) {
    // Map the product category to the corresponding div ID
    const lowercaseCategory = category.toLowerCase();
    switch (lowercaseCategory) {
        case "pizza":
            return document.getElementById("pizza-list");
        case "salad":
            return document.getElementById("salad-list");
        case "appetizer":
            return document.getElementById("appetizer-list");
        case "category 1":
            return document.getElementById("kebab-list");
        default:
            return null; // Return null if category is not found
    }
}

