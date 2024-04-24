document.addEventListener("DOMContentLoaded", function() {
    const pizzaContainer = document.getElementById("pizza-container");
    const pizzaBase = document.getElementById("pizza-base");
    const toppingButtons = document.querySelectorAll(".topping-button");
  
    const crustWidth = 50; // Adjust this value to set the width of the crust
  
    toppingButtons.forEach(button => {
      button.addEventListener("click", () => {
        const topping = button.dataset.topping;
        addToppings(topping);
      });
    });
  
    function addToppings(topping) {
      for (let i = 0; i < 10; i++) {
        const toppingElement = document.createElement("div");
        toppingElement.className = "topping";
        toppingElement.classList.add(topping);
        
        // Calculate random polar coordinates (r, theta) within the pizza base,
        // excluding the crust area
        const maxRadius = pizzaBase.offsetWidth / 2 - crustWidth; // Adjust to half the diameter of the pizza base
        let r, theta;
        do {
          r = Math.random() * maxRadius;
          theta = Math.random() * 2 * Math.PI;
        } while (r < 10); // Ensure toppings are at least 10px away from the center (crust)
  
        // Convert polar coordinates to Cartesian coordinates and position relative to the pizza base
        const x = r * Math.cos(theta) + pizzaBase.offsetLeft + pizzaBase.offsetWidth / 2;
        const y = r * Math.sin(theta) + pizzaBase.offsetTop + pizzaBase.offsetHeight / 2;
  
        toppingElement.style.left = x + "px";
        toppingElement.style.top = y + "px";
        pizzaContainer.appendChild(toppingElement);
      }
    }
  });
  