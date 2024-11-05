// Función para mostrar u ocultar los campos de tienda o conductor según el rol seleccionado
function toggleFields() {
    const role = document.getElementById('role').value;
    const storeField = document.getElementById('store_field');
    const driverField = document.getElementById('driver_field');
    const storeSelect = document.getElementById('store');

    if (role === 'vendedor' || role === 'gerente') {
        // Mostrar lista de tiendas y ocultar el campo de conductor
        storeField.style.display = 'block';
        driverField.style.display = 'none';
        storeSelect.disabled = false;
    } else if (role === 'conductor') {
        // Mostrar campo de vehículo y ocultar la lista de tiendas
        storeField.style.display = 'none';
        driverField.style.display = 'block';
    } else {
        // Roles distintos de vendedor, gerente y conductor: tienda fija "La Junior"
        storeField.style.display = 'block';
        driverField.style.display = 'none';
        storeSelect.value = 'Store La Junior'; // Tienda fija "La Junior"
        storeSelect.disabled = true; // No permitir cambios
    }
}

// Obtener el ID del usuario desde la URL
function getUserIdFromURL() { //window.location.search: Obtiene la cadena de consulta de la URL
    const params = new URLSearchParams(window.location.search); //URLSearchParams: Objeto que permite acceder a los parámetros de la URL
    return params.get("userId"); // Retorna el valor del parámetro "userId"
}

// Cargar los datos del usuario en el formulario
function loadUserData() {
    const userId = getUserIdFromURL();
    const users = JSON.parse(localStorage.getItem("users")) || []; // Obtener los usuarios del localStorage
    const user = users[userId]; // Obtener el usuario con el ID especificado

    // Si el usuario existe, cargar sus datos en el formulario
    if (user) {
        // Cargar datos en el formulario
        document.getElementById("first_name").value = user.firstName;
        document.getElementById("last_name").value = user.lastName;
        document.getElementById("email").value = user.email;
        document.getElementById("role").value = user.role;
        document.getElementById("status").value = user.status;

        // Mostrar tienda asignada o vehículo según el rol del usuario
        toggleFields(); // Llamada a toggleFields para ajustar visibilidad

        // Si el usuario es vendedor o gerente, mostrar el campo de tienda
        if (user.role === "vendedor" || user.role === "gerente") {
            document.getElementById("store").value = user.store || "";
        } else if (user.role === "conductor") { // Si el usuario es conductor, mostrar el campo de vehículo
            document.getElementById("driver").value = user.driver || "";
        }
    }
}

// Guardar los cambios del usuario editado
function saveUserData() {
    const userId = getUserIdFromURL();
    const users = JSON.parse(localStorage.getItem("users")) || []; // || [] es para evitar errores si no hay usuarios en localStorage

    // Actualizar la información del usuario
    users[userId] = {
        firstName: document.getElementById("first_name").value,
        lastName: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        status: document.getElementById("status").value,
        store: (document.getElementById("role").value === "vendedor" || document.getElementById("role").value === "gerente") 
               ? document.getElementById("store").value 
               : "Store La Junior", // Si el rol es vendedor o gerente, se guarda el valor del campo store, si no, se guarda "Store La Junior"
        driver: document.getElementById("role").value === "conductor" ? document.getElementById("driver").value : ""
    };

    // Guardar los datos actualizados en Local Storage
    localStorage.setItem("users", JSON.stringify(users)); // JSON.stringify convierte el objeto users en una cadena de texto

    // Redirigir a la lista de usuarios
    window.location.href = "user_list.html";
}

// Guardar cambios cuando se presiona el botón de guardar
document.getElementById("save_button").addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    saveUserData(); // Guardar los datos del usuario
});

// Ejecutar al cargar la página para inicializar el formulario y el menú
document.addEventListener("DOMContentLoaded", () => {
    loadUserData();      // Cargar los datos del usuario
    toggleFields();      // Ajustar los campos según el rol
});
