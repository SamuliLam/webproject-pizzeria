window.onload = async function() {
  const menuContainer = document.getElementById("menu");
  const menuTable = document.querySelector(".menu-table");

  try {
    const response = await fetch("http://10.120.32.55/app/api/v1/products");
    const data = await response.json();

    if (response.ok) {
      const headerRow = document.createElement("div");
      headerRow.classList.add("menu-row", "menu-header");
      const headerNames = ["Pizza Name", "Description", "Price (€)", "Allergens"];
      headerNames.forEach(name => {
        const headerCell = document.createElement("div");
        headerCell.classList.add("menu-cell");
        headerCell.textContent = name;
        headerRow.appendChild(headerCell);
      });
      menuTable.appendChild(headerRow);

      data.forEach(product => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-row", "menu-item");

        const cells = ["name", "description", "price", "allergens"];
        cells.forEach(key => {
          const cell = document.createElement("div");
          cell.classList.add("menu-cell");
          cell.textContent = product[key];
          menuItem.appendChild(cell);
        });

        menuTable.appendChild(menuItem);
      });
    } else {
      console.error("Failed to fetch products:", data.error);
    }
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};
