// Referencias a los selectores de tienda, vendedor y el botón de asignar
const storeSelect = document.getElementById("store");
const sellerSelect = document.getElementById("seller");
const assignButton = document.getElementById("assign_button");
const assignedSellersList = document.getElementById("assigned_sellers_list");

// Función para cargar las tiendas
function loadStores() {
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    
    // Limpiar las opciones anteriores
    storeSelect.innerHTML = "";
    
    if (stores.length > 1) { 
        storeSelect.innerHTML = '<option disabled selected>Escoge una tienda</option>';
        stores.forEach(store => {
            if (store.name !== "La Junior") { 
                const option = document.createElement("option");
                option.value = store.name;
                option.textContent = store.name;
                storeSelect.appendChild(option);
            }
        });
    } else {
        storeSelect.innerHTML = '<option disabled selected>Crea una tienda</option>';
    }
}

// Función para cargar los vendedores
function loadSellers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    sellerSelect.innerHTML = "";
    
    const vendors = users.filter(user => user.role === "vendedor");
    
    if (vendors.length > 0) {
        sellerSelect.innerHTML = '<option disabled selected>Escoge un vendedor</option>';
        vendors.forEach(vendor => {
            const option = document.createElement("option");
            option.value = `${vendor.firstName} ${vendor.lastName}`;
            option.textContent = `${vendor.firstName} ${vendor.lastName}`;
            sellerSelect.appendChild(option);
        });
    } else {
        sellerSelect.innerHTML = '<option disabled selected>Crea un vendedor</option>';
    }
}

// Función para cargar las asignaciones desde el localStorage
function loadAssignments() {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignedSellersList.innerHTML = "";

    if (assignments.length === 0) {
        assignedSellersList.innerHTML = '<tr><td colspan="3" class="no_data">No hay asignaciones disponibles</td></tr>';
    } else {
        assignments.forEach(assignment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${assignment.store}</td>
                <td>${assignment.seller}</td>
                <td><button class="action_button delete_button" onclick="removeAssignment('${assignment.store}')">Eliminar</button></td>
            `;
            assignedSellersList.appendChild(row);
        });
    }
}

// Función para asignar un vendedor a una tienda
function assignSeller() {
    const store = storeSelect.value;
    const seller = sellerSelect.value;

    if (!store || !seller) {
        alert("Por favor, seleccione una tienda y un vendedor.");
        return;
    }

    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const existingAssignment = assignments.find(assignment => assignment.store === store);
    if (existingAssignment) {
        alert("Esta tienda ya tiene un vendedor asignado.");
        return;
    }

    assignments.push({ store: store, seller: seller });
    localStorage.setItem("assignments", JSON.stringify(assignments));

    loadAssignments();
}

// Función para eliminar una asignación
function removeAssignment(store) {
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments = assignments.filter(assignment => assignment.store !== store);
    localStorage.setItem("assignments", JSON.stringify(assignments));

    loadAssignments();
}

// Cargar el vendedor asignado para la tienda seleccionada en el formulario de orden
function loadAssignedSellerForOrder() {
    const storeName = document.getElementById("store_name").value;
    document.getElementById("assigned_seller").value = getAssignedSeller(storeName);
}

// Obtener el vendedor asignado a una tienda específica
function getAssignedSeller(storeName) {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const assignment = assignments.find(assignment => assignment.store === storeName);
    return assignment ? assignment.seller : "Sin asignar";
}

// Asignar las funciones de inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadStores();
    loadSellers();
    loadAssignments();
    document.getElementById("store_name").addEventListener("change", loadAssignedSellerForOrder);
});

assignButton.addEventListener("click", assignSeller);
