document.addEventListener("DOMContentLoaded", loadOrderForEdit);

// Función para cargar la orden seleccionada en el formulario de edición
function loadOrderForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIndex = urlParams.get("orderIndex");

    if (orderIndex === null) {
        alert("No se encontró la orden para editar.");
        window.location.href = "view_orders.html";
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders[orderIndex];

    // Cargar los datos básicos de la orden
    document.getElementById("edit_order_number").value = order.orderNumber;
    document.getElementById("edit_order_date").value = order.orderDate;
    document.getElementById("edit_store_name").value = order.storeName;
    document.getElementById("edit_assigned_seller").value = order.assignedSeller;
    document.getElementById("edit_order_total").value = order.orderTotal;
    document.getElementById("edit_payment_type").value = order.paymentType;
    document.getElementById("edit_payment_status").value = order.paymentStatus;
    document.getElementById("edit_comments").value = order.comments;

    // Cargar cada producto en la tabla de resumen de productos
    const productSummaryBody = document.getElementById("product_summary_body");
    order.products.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.brand}</td>
            <td>${product.presentation}</td>
            <td>${product.unitPrice}</td>
            <td><input type="number" value="${product.quantity}" min="1" onchange="updateProductSubtotal(this, ${index})"></td>
            <td class="subtotal">${product.subtotal}</td>
            <td><button class="action_button" onclick="removeProductFromEdit(${index})">Eliminar</button></td>
        `;

        productSummaryBody.appendChild(row);
    });
}

// Función para actualizar el subtotal de un producto al cambiar la cantidad
function updateProductSubtotal(input, index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderIndex = new URLSearchParams(window.location.search).get("orderIndex");
    const order = orders[orderIndex];
    const product = order.products[index];
    const unitPrice = parseFloat(product.unitPrice.replace('$', ''));
    const quantity = parseInt(input.value);
    const subtotal = unitPrice * quantity;

    product.quantity = quantity;
    product.subtotal = subtotal;

    document.querySelectorAll(".subtotal")[index].textContent = `$${subtotal}`;
    updateOrderTotal(order);
}

// Función para actualizar el total de la orden después de cambios
function updateOrderTotal(order) {
    let total = 0;
    order.products.forEach(product => {
        total += parseFloat(product.subtotal);
    });
    document.getElementById("edit_order_total").value = `$${total}`;
}

// Función para eliminar un producto de la edición
function removeProductFromEdit(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderIndex = new URLSearchParams(window.location.search).get("orderIndex");
    const order = orders[orderIndex];

    order.products.splice(index, 1); // Eliminar producto por su índice
    localStorage.setItem("orders", JSON.stringify(orders)); // Actualizar el Local Storage
    loadOrderForEdit(); // Recargar la tabla de productos
}

// Función para guardar los cambios en la orden editada
function saveEditedOrder() {
    const orderIndex = new URLSearchParams(window.location.search).get("orderIndex");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = orders[orderIndex];
    order.orderDate = document.getElementById("edit_order_date").value;
    order.orderTotal = document.getElementById("edit_order_total").value;
    order.paymentType = document.getElementById("edit_payment_type").value;
    order.paymentStatus = document.getElementById("edit_payment_status").value;
    order.comments = document.getElementById("edit_comments").value;

    localStorage.setItem("orders", JSON.stringify(orders)); // Guardar cambios en Local Storage
    alert("Orden actualizada exitosamente.");
    window.location.href = "view_orders.html";
}
