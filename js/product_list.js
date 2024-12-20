// Esperar a que el DOM se cargue antes de ejecutar funciones
document.addEventListener("DOMContentLoaded", () => {
    initializeOrderForm(); // Inicializar el formulario de la orden
    loadStores();          // Cargar las tiendas en el selector
    loadCategories();      // Cargar las categorías en el selector
});

// Generar un número de orden único
function generateOrderNumber() {
    return 'ORD-' + Date.now();
}

// Inicializar el formulario de la orden con un número y fecha predeterminada
function initializeOrderForm() {
    document.getElementById("order_number").value = generateOrderNumber();
    document.getElementById("order_date").value = new Date().toISOString().split('T')[0];
}

// Cargar la lista de tiendas desde el Local Storage y agregar al selector de tienda
function loadStores() {
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    const storeSelect = document.getElementById("store_name");
    storeSelect.innerHTML = '<option value="">Seleccione una tienda</option>';

    stores.forEach(store => {
        const option = document.createElement("option");
        option.value = store.name;
        option.textContent = store.name;
        storeSelect.appendChild(option);
    });
    storeSelect.addEventListener("change", loadAssignedSeller);
}

// Cargar el vendedor asignado basado en la tienda seleccionada
function loadAssignedSeller() {
    const storeName = document.getElementById("store_name").value;
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const selectedAssignment = assignments.find(assignment => assignment.store === storeName);
    document.getElementById("assigned_seller").value = selectedAssignment ? selectedAssignment.seller : "Sin asignar";
}

// Cargar categorías en el selector de categorías
function loadCategories() {
    const categoryFilter = document.getElementById("category_filter");
    categoryFilter.innerHTML = '<option value="">Seleccione una categoría</option>';
    const categories = JSON.parse(localStorage.getItem("categories")) || ["Esencias", "Salsas", "Vinagres", "Margarina", "Empaques PET"];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filtrar los productos por la categoría seleccionada y cargar los detalles correspondientes
function filterProductsByCategory() {
    const selectedCategory = document.getElementById("category_filter").value;
    const productSelectTemplate = document.querySelector(".product_select");
    productSelectTemplate.innerHTML = '<option value="">Seleccione un producto</option>';
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filteredProducts = products.filter(product => product.category === selectedCategory);

    filteredProducts.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        option.setAttribute("data-brand", product.manufacturer); // Marca
        option.setAttribute("data-presentation", product.presentation); // Presentación
        option.setAttribute("data-price", product.price); // Precio unitario
        productSelectTemplate.appendChild(option.cloneNode(true));
    });
}

// Actualizar los detalles del producto cuando se selecciona uno
function updateProductDetails(selectElement) {
    const productEntry = selectElement.closest(".product_entry");
    const selectedProduct = selectElement.selectedOptions[0];
    const brand = selectedProduct.getAttribute("data-brand");
    const presentation = selectedProduct.getAttribute("data-presentation");
    const price = selectedProduct.getAttribute("data-price");

    // Asignar marca, presentación y precio en los campos correspondientes
    productEntry.querySelector(".product_brand").value = brand;
    productEntry.querySelector(".product_presentation").value = presentation;
    productEntry.querySelector(".unit_price").value = `$${price}`;
    updateSubtotal(productEntry.querySelector(".quantity_input"));
}

// Calcular y actualizar el subtotal cuando cambia la cantidad de producto
function updateSubtotal(quantityInput) {
    const productEntry = quantityInput.closest(".product_entry");
    const unitPrice = parseFloat(productEntry.querySelector(".unit_price").value.replace('$', ''));
    const quantity = parseInt(quantityInput.value);
    const subtotal = unitPrice * quantity;
    productEntry.querySelector(".subtotal").value = `$${subtotal}`;
    updateOrderTotal();
}

// Calcular y actualizar el total de la orden
function updateOrderTotal() {
    const subtotals = document.querySelectorAll(".subtotal");
    let total = 0;
    subtotals.forEach(sub => {
        total += parseFloat(sub.value.replace('$', '') || 0);
    });
    document.getElementById("order_total").value = `$${total}`;
}

// Eliminar una línea de producto en el formulario de orden
function removeProduct(button) {
    const productEntry = button.closest(".product_entry");
    if (document.querySelectorAll(".product_entry").length > 1) {
        productEntry.remove();
    }
    updateOrderTotal();
}

// Guardar la orden en el Local Storage
function saveOrder() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
        orderNumber: document.getElementById("order_number").value,
        orderDate: document.getElementById("order_date").value,
        storeName: document.getElementById("store_name").value,
        assignedSeller: document.getElementById("assigned_seller").value,
        products: [],
        orderTotal: document.getElementById("order_total").value,
        paymentType: document.getElementById("payment_type").value,
        paymentStatus: document.getElementById("payment_status").value,
        comments: document.getElementById("comments").value
    };

    // Recorrer cada línea de producto en el formulario y agregarla a la orden
    document.querySelectorAll(".product_entry").forEach(entry => {
        const productName = entry.querySelector(".product_select").value;
        const brand = entry.querySelector(".product_brand").value;
        const presentation = entry.querySelector(".product_presentation").value;
        const quantity = entry.querySelector(".quantity_input").value;
        const unitPrice = entry.querySelector(".unit_price").value;
        const subtotal = entry.querySelector(".subtotal").value;

        if (productName) {
            order.products.push({ productName, brand, presentation, quantity, unitPrice, subtotal });
        }
    });

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Orden guardada exitosamente");
    window.location.reload();
}
