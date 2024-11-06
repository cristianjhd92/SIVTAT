// Categorías predefinidas que no pueden ser eliminadas
const predefinedCategories = ["Esencias", "Salsas", "Vinagres", "Margarina", "Empaques PET"];

// Limpiar localStorage y luego inicializar productos predeterminados
function clearAndInitialize() {
    localStorage.clear();
    initializeSampleProducts();
}

// Inicializar productos con nombres y fabricantes correctos
function initializeSampleProducts() {
    const sampleProducts = [
        { name: "Esencia sabor a Vainilla Negra", manufacturer: "La Junior", category: "Esencias", presentation: "250 ml", price: 3000, boxQuantity: 24 },
        { name: "Esencia sabor a Vainilla Francesa", manufacturer: "La Junior", category: "Esencias", presentation: "250 ml", price: 3000, boxQuantity: 24 },
        { name: "Esencia sabor a Vainilla Blanca", manufacturer: "La Junior", category: "Esencias", presentation: "250 ml", price: 3000, boxQuantity: 24 },
        { name: "Vinagre de Manzana", manufacturer: "La Junior", category: "Vinagres", presentation: "500 ml", price: 2000, boxQuantity: 12 },
        { name: "Vinagre Blanco", manufacturer: "La Junior", category: "Vinagres", presentation: "500 ml", price: 1800, boxQuantity: 12 },
        // Agrega aquí más productos según las categorías y estructura necesarias
    ];
    localStorage.setItem("products", JSON.stringify(sampleProducts));
}

// Cargar categorías y productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    clearAndInitialize(); // Limpiar y cargar productos predeterminados
    loadCategories();
    loadProductsByCategory(predefinedCategories[0]); // Cargar productos de la primera categoría por defecto
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

// Filtrar productos por la categoría seleccionada
function filterProductsByCategory() {
    const selectedCategory = document.getElementById("category_select").value;
    loadProductsByCategory(selectedCategory);
}

// Función para cargar productos en la tabla según la categoría seleccionada
function loadProductsByCategory(category) {
    const productListBody = document.getElementById("product_table_body");
    productListBody.innerHTML = ""; // Limpiar la tabla

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filteredProducts = products.filter(product => product.category === category);

    // Mostrar mensaje si no hay productos en la categoría
    if (filteredProducts.length === 0) {
        const noProductsRow = document.createElement("tr");
        const noProductsCell = document.createElement("td");
        noProductsCell.colSpan = 8;
        noProductsCell.textContent = "No hay productos en esta categoría.";
        noProductsCell.classList.add("no_products");
        productListBody.appendChild(noProductsRow);
        return;
    }

    // Crear filas para cada producto
    filteredProducts.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>${product.presentation}</td>
            <td class="price-cell">$${Math.floor(product.price)}</td>
            <td>${product.boxQuantity} unidades</td>
            <td>$${Math.floor(product.price * product.boxQuantity)}</td>
            <td>
                <button class="edit_button" onclick="redirectToEdit('${product.name}')">Editar</button>
                <button class="delete_button" onclick="deleteProduct('${product.name}')">Borrar</button>
            </td>
        `;
        productListBody.appendChild(row);
    });
}

// Redirigir a la página de edición con los detalles del producto
function redirectToEdit(productName) {
    localStorage.setItem("editProduct", productName); // Guardar el nombre del producto que se va a editar
    window.location.href = "edit_product.html"; // Redirigir a la página de edición
}

// Cargar datos del producto para edición en edit_product.html
function loadEditProduct() {
    const productName = localStorage.getItem("editProduct");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.name === productName);

    if (product) {
        document.getElementById("product_name").value = product.name;
        document.getElementById("product_manufacturer").value = product.manufacturer;
        document.getElementById("product_category").value = product.category;
        document.getElementById("product_presentation").value = product.presentation;
        document.getElementById("product_price").value = Math.floor(product.price);
        document.getElementById("box_quantity").value = product.boxQuantity;
    }
}

// Guardar los cambios en la información del producto editado
function saveEditedProduct() {
    const productName = localStorage.getItem("editProduct");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = products.findIndex(p => p.name === productName);

    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            manufacturer: document.getElementById("product_manufacturer").value,
            category: document.getElementById("product_category").value,
            presentation: document.getElementById("product_presentation").value,
            price: parseInt(document.getElementById("product_price").value),
            boxQuantity: parseInt(document.getElementById("box_quantity").value),
        };
        localStorage.setItem("products", JSON.stringify(products));
        window.location.href = "product_list.html"; // Volver a la lista de productos
    }
}

// Función para eliminar un producto
function deleteProduct(productName) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.name !== productName);
    localStorage.setItem("products", JSON.stringify(products));
    loadProductsByCategory(document.getElementById("category_select").value);
}
