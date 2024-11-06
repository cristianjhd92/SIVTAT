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
    document.getElementById("order_number").value = generateOrderNumber(); // Asigna número de orden único
    document.getElementById("order_date").value = new Date().toISOString().split('T')[0]; // Fecha actual
}

// Cargar la lista de tiendas desde el Local Storage y agregar al selector de tienda
function loadStores() {
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    const storeSelect = document.getElementById("store_name");
    storeSelect.innerHTML = '<option value="">Seleccione una tienda</option>'; // Opción inicial

    stores.forEach(store => {
        const option = document.createElement("option");
        option.value = store.name;
        option.textContent = store.name;
        storeSelect.appendChild(option); // Añadir cada tienda como opción
    });
    storeSelect.addEventListener("change", loadAssignedSeller); // Cargar el vendedor asignado al cambiar la tienda
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
    categoryFilter.innerHTML = '<option value="">Seleccione una categoría</option>'; // Opción inicial
    const categories = JSON.parse(localStorage.getItem("categories")) || ["Esencias", "Salsas", "Vinagres", "Margarina", "Empaques PET"];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option); // Añadir cada categoría como opción
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
    productEntry.querySelector(".presentation_select").innerHTML = `<option>${presentation}</option>`;
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

// Calcular y actualizar el total de la orden basado en la tabla de productos añadidos
function updateOrderTotal() {
    const subtotals = document.querySelectorAll("#product_summary_body .subtotal");
    let total = 0;
    subtotals.forEach(sub => {
        total += parseFloat(sub.textContent.replace('$', '') || 0); // Sumar cada subtotal de la tabla
    });
    document.getElementById("order_total").value = `$${total}`; // Mostrar el total
}

// Función para agregar producto a la tabla de resumen
function addProduct() {
    const productEntry = document.querySelector(".product_entry"); // Seleccionar la entrada de producto
    const productName = productEntry.querySelector(".product_select").value;
    const brand = productEntry.querySelector(".product_brand").value;
    const presentation = productEntry.querySelector(".presentation_select").value;
    const quantity = productEntry.querySelector(".quantity_input").value;
    const unitPrice = productEntry.querySelector(".unit_price").value;
    const subtotal = productEntry.querySelector(".subtotal").value;

    // Verificar que todos los campos estén llenos antes de agregar
    if (!productName || !quantity || !unitPrice || !subtotal) {
        alert("Por favor, complete todos los detalles del producto.");
        return;
    }

    // Crear una nueva fila en la tabla de resumen de productos
    const productSummaryBody = document.getElementById("product_summary_body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${brand}</td>
        <td>${presentation}</td>
        <td>${unitPrice}</td>
        <td>${quantity}</td>
        <td class="subtotal">${subtotal}</td> <!-- Asegurar que el subtotal se guarde como texto en la celda -->
        <td><button class="action_button" onclick="removeProductFromTable(this)">Eliminar</button></td>
    `;

    productSummaryBody.appendChild(newRow); // Agregar la nueva fila a la tabla
    clearProductEntry(); // Limpiar la entrada de producto para agregar otro si es necesario
    updateOrderTotal(); // Actualizar el total de la orden
}

// Función para limpiar los campos de entrada del producto después de agregarlo a la tabla
function clearProductEntry() {
    const productEntry = document.querySelector(".product_entry");
    productEntry.querySelector(".product_select").value = "";
    productEntry.querySelector(".product_brand").value = "";
    productEntry.querySelector(".presentation_select").innerHTML = '<option value="">Seleccione una presentación</option>';
    productEntry.querySelector(".quantity_input").value = 1;
    productEntry.querySelector(".unit_price").value = "";
    productEntry.querySelector(".subtotal").value = "";
}

// Eliminar un producto específico de la tabla de resumen de productos
function removeProductFromTable(button) {
    const row = button.closest("tr");
    row.remove(); // Eliminar la fila de la tabla
    updateOrderTotal(); // Actualizar el total de la orden después de eliminar un producto
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

    // Recorrer cada fila en la tabla de resumen de productos y agregarla a la orden
    document.querySelectorAll("#product_summary_body tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        order.products.push({
            productName: cells[0].textContent,
            brand: cells[1].textContent,
            presentation: cells[2].textContent,
            unitPrice: cells[3].textContent,
            quantity: cells[4].textContent,
            subtotal: cells[5].textContent
        });
    });

    orders.push(order); // Agregar la nueva orden al array de órdenes
    localStorage.setItem("orders", JSON.stringify(orders)); // Guardar en Local Storage
    alert("Orden guardada exitosamente");
    window.location.reload(); // Recargar la página
}
