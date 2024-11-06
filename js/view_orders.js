document.addEventListener("DOMContentLoaded", loadOrders); // Cargar las órdenes al cargar la página

// Función para cargar y mostrar las órdenes desde el Local Storage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersBody = document.getElementById("orders_body");

    ordersBody.innerHTML = ""; // Limpiar contenido previo

    // Verificar si hay órdenes para mostrar
    if (orders.length === 0) {
        ordersBody.innerHTML = `<tr><td colspan="6">No hay órdenes guardadas</td></tr>`;
        return;
    }

    // Generar una fila en la tabla para cada orden
    orders.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.orderDate}</td>
            <td>${order.storeName}</td>
            <td>${order.assignedSeller}</td>
            <td>${order.orderTotal}</td>
            <td>
                <button class="action_button" onclick="editOrder(${index})">Editar</button>
                <button class="action_button" onclick="deleteOrder(${index})">Eliminar</button>
            </td>
        `;

        ordersBody.appendChild(row); // Añadir la fila a la tabla
    });
}

// Función para redirigir a la página de edición de la orden
function editOrder(index) {
    // Redirigir a edit_order.html con el índice de la orden en la URL
    window.location.href = `edit_order.html?orderIndex=${index}`;
}

// Función para eliminar una orden del Local Storage y actualizar la vista
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1); // Eliminar la orden por su índice
    localStorage.setItem("orders", JSON.stringify(orders)); // Guardar cambios en Local Storage
    loadOrders(); // Recargar la tabla de órdenes
}
