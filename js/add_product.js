document.addEventListener("DOMContentLoaded", () => {
    loadCategories(); // Cargar categorías predefinidas y adicionales en el selector
});

// Función para cargar categorías en el selector
function loadCategories() {
    const categorySelect = document.getElementById("product_category");
    categorySelect.innerHTML = ""; // Limpiar el selector

    const predefinedCategories = ["Esencias", "Salsas", "Vinagres", "Margarina", "Empaques PET"];
    const customCategories = JSON.parse(localStorage.getItem("customCategories")) || [];

    // Agregar categorías predefinidas y dinámicas
    [...predefinedCategories, ...customCategories].forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Función para añadir un nuevo producto
function addNewProduct() {
    const productName = document.getElementById("product_name").value.trim();
    const productManufacturer = document.getElementById("product_manufacturer").value.trim();
    const productCategory = document.getElementById("product_category").value;
    const productPresentation = document.getElementById("product_presentation").value.trim();
    const productPrice = parseFloat(document.getElementById("product_price").value);
    const boxQuantity = parseInt(document.getElementById("box_quantity").value);

    // Validación simple
    if (!productName || !productManufacturer || !productCategory || !productPresentation || productPrice <= 0 || boxQuantity <= 0) {
        alert("Por favor complete todos los campos correctamente.");
        return;
    }

    // Crear objeto de producto
    const newProduct = {
        name: productName,
        manufacturer: productManufacturer,
        category: productCategory,
        presentation: productPresentation,
        price: productPrice,
        boxQuantity: boxQuantity
    };

    // Guardar el nuevo producto en Local Storage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Producto añadido exitosamente.");
    window.location.href = "product_list.html"; // Redirigir a la lista de productos
}
