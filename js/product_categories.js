// Categorías predefinidas que no pueden ser eliminadas
const predefinedCategories = ["Esencias", "Salsas", "Vinagres", "Margarina","Empaques PET"];

// Cargar categorías y productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadProductsByCategory(predefinedCategories[0]); // Cargar productos de la primera categoría predefinida por defecto
});

// Cargar las categorías en el selector, incluidas las creadas dinámicamente
function loadCategories() {
    const categorySelect = document.getElementById("category_select");
    categorySelect.innerHTML = ""; // Limpiar el selector

    // Agregar categorías predefinidas
    predefinedCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Agregar categorías adicionales del Local Storage
    const customCategories = JSON.parse(localStorage.getItem("customCategories")) || [];
    customCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Agregar nueva categoría
document.getElementById("add_category_button").addEventListener("click", () => {
    const newCategory = document.getElementById("new_category").value.trim();
    if (!newCategory) {
        alert("Ingrese un nombre para la categoría.");
        return;
    }

    // Verificar si la categoría ya existe
    const allCategories = [...predefinedCategories, ...(JSON.parse(localStorage.getItem("customCategories")) || [])];
    if (allCategories.includes(newCategory)) {
        alert("La categoría ya existe.");
        return;
    }

    // Agregar la nueva categoría al Local Storage
    const customCategories = JSON.parse(localStorage.getItem("customCategories")) || [];
    customCategories.push(newCategory);
    localStorage.setItem("customCategories", JSON.stringify(customCategories));

    // Recargar el selector de categorías
    loadCategories();
    document.getElementById("new_category").value = ""; // Limpiar campo de entrada
});

// Cargar productos de la categoría seleccionada
document.getElementById("category_select").addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    loadProductsByCategory(selectedCategory);
});

// Función para cargar los productos en la categoría seleccionada
function loadProductsByCategory(category) {
    const productListBody = document.getElementById("product_list_body");
    productListBody.innerHTML = ""; // Limpiar la tabla

    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Filtrar productos por categoría seleccionada
    const filteredProducts = products.filter(product => product.category === category);

    // Mostrar mensaje si no hay productos
    if (filteredProducts.length === 0) {
        const noProductsRow = document.createElement("tr");
        const noProductsCell = document.createElement("td");
        noProductsCell.colSpan = 4;
        noProductsCell.textContent = "No hay productos en esta categoría.";
        noProductsCell.classList.add("no_products");
        noProductsRow.appendChild(noProductsCell);
        productListBody.appendChild(noProductsRow);
        return;
    }

    // Crear filas para cada producto
    filteredProducts.forEach(product => {
        const row = document.createElement("tr");

        // Nombre del producto
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // Descripción del producto
        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Precio del producto
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${product.price.toFixed(2)}`;
        row.appendChild(priceCell);

        // Acciones (por ahora, solo eliminar)
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete_button");

        // Evento para eliminar producto
        deleteButton.addEventListener("click", () => {
            deleteProduct(product);
            loadProductsByCategory(category); // Recargar productos de la categoría
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        productListBody.appendChild(row);
    });
}

// Función para eliminar producto del Local Storage
function deleteProduct(productToDelete) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.name !== productToDelete.name);
    localStorage.setItem("products", JSON.stringify(products));
}
