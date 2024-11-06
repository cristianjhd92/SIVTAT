document.addEventListener("DOMContentLoaded", loadEditProduct);

// Función para cargar los datos del producto seleccionado para edición
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

// Función para guardar los cambios realizados en la edición del producto
function saveEditedProduct() {
    const productName = localStorage.getItem("editProduct");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productIndex = products.findIndex(p => p.name === productName);

    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            manufacturer: document.getElementById("product_manufacturer").value,
            presentation: document.getElementById("product_presentation").value,
            price: parseInt(document.getElementById("product_price").value),
            boxQuantity: parseInt(document.getElementById("box_quantity").value),
        };
        localStorage.setItem("products", JSON.stringify(products));
        window.location.href = "product_list.html"; // Volver a la lista de productos después de guardar
    }
}
