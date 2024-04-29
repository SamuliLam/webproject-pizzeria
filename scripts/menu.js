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
                            // Function to handle fetching the single order
                            addProductToOrder(product); // Change the order ID as needed
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

async function addProductToOrder(product) {
    try {
        const response = await fetch("http://10.120.32.55/app//api/v1/orders/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order: {
                    customer_id: 2,
                    delivery_address: "Samulin katu 1",
                    status: "processing",
                    total_price: product.price
                },
                products: [
                    { product_id: product.id }
                ]
            })
        });

        if (response.ok) {
            console.log("Order created successfully");
            console.log(product)
        } else {
            const responseData = await response.json();
            console.error("Failed to create order:", responseData.error);
        }
    } catch (error) {
        console.error("Error creating order:", error.message);
    }
}


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
