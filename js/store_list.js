// Cargar y mostrar la lista de tiendas almacenadas en Local Storage
function loadStoreList() {
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    
    // Si no existen tiendas, agregar la tienda predeterminada "La Junior"
    if (stores.length === 0) {
        stores.push({
            name: "La Junior",
            address: "Carrera 50 # 44-42",
            phone: "3001234567",
            status: "activo"
        });
        localStorage.setItem("stores", JSON.stringify(stores));
    }

    const storeListBody = document.getElementById("store_list_body");
    storeListBody.innerHTML = ""; // Limpiar la tabla antes de agregar filas

    // Recorrer cada tienda para crear una fila en la tabla
    stores.forEach((store, index) => {
        const row = document.createElement("tr");
        
        // Crear y agregar celdas de nombre, dirección, teléfono, y estado
        row.innerHTML = `
            <td>${store.name}</td>
            <td>${store.address}</td>
            <td>${store.phone}</td>
            <td>${store.status.charAt(0).toUpperCase() + store.status.slice(1)}</td>
            <td>
                <button class="action_button edit_button" onclick="editStore(${index})">Editar</button>
                <button class="action_button delete_button" onclick="deleteStore(${index})">Borrar</button>
            </td>
        `;

        storeListBody.appendChild(row); // Añadir la fila a la tabla
    });
}

// Función para redirigir a la página de edición de tiendas con el ID de la tienda en la URL
function editStore(index) {
    window.location.href = `edit_store.html?storeId=${index}`;
}

// Función para eliminar una tienda de la lista
function deleteStore(index) {
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    
    // Confirmar la eliminación antes de proceder
    if (confirm("¿Estás seguro de que deseas eliminar esta tienda?")) {
        stores.splice(index, 1); // Eliminar tienda seleccionada
        localStorage.setItem("stores", JSON.stringify(stores)); // Guardar la lista actualizada
        loadStoreList(); // Recargar la lista de tiendas
    }
}

// Ejecutar la carga de la lista de tiendas al cargar la página
document.addEventListener("DOMContentLoaded", loadStoreList);
