export const menuComponent = (menu) => {
    const table = document.createElement("table");
    table.classList.add("menu-table");

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    const headerNames = ["Product Name", "Description", "Price (€)", "Allergens"];
}