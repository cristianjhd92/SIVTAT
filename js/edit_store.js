// Obtener el ID del usuario desde la URL para cargar los datos correspondientes
function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("userId");
}

// Cargar los datos del usuario en el formulario al cargar la página
function loadUserData() {
    const userId = getUserIdFromURL();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[userId];

    if (user) {
        // Cargar los valores del usuario en los campos de entrada
        document.getElementById("first_name").value = user.firstName;
        document.getElementById("last_name").value = user.lastName;
        document.getElementById("email").value = user.email;
        document.getElementById("role").value = user.role;
        document.getElementById("status").value = user.status;

        // Configuración de la tienda según el rol
        if (user.role === "vendedor") {
            // Para "vendedor", permitir edición de tienda
            document.getElementById("store").value = user.store || "Sin Asignar";
            document.getElementById("store").removeAttribute("disabled");
        } else {
            // Para gerente y otros roles, asignar "Store La Junior" y deshabilitar la edición
            document.getElementById("store").value = "Store La Junior";
            document.getElementById("store").setAttribute("disabled", "true");
        }

        // Asignar "Sin Asignar" al campo de vehículo si es conductor
        document.getElementById("driver").value = user.role === "conductor" ? (user.driver || "Sin Asignar") : "";
    }
}

// Guardar los cambios realizados en el usuario y actualizar el Local Storage
function saveUserData() {
    const userId = getUserIdFromURL();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Actualizar los datos del usuario en el array de usuarios
    users[userId] = {
        firstName: document.getElementById("first_name").value,
        lastName: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        status: document.getElementById("status").value,
        // La tienda se establece en "Store La Junior" para todos los roles excepto "vendedor"
        store: document.getElementById("role").value === "vendedor"
            ? document.getElementById("store").value
            : "Store La Junior",
        driver: document.getElementById("role").value === "conductor" ? document.getElementById("driver").value : ""
    };

    // Guardar el array actualizado en Local Storage
    localStorage.setItem("users", JSON.stringify(users));

    // Redirigir a la lista de usuarios
    window.location.href = "user_list.html";
}

// Evento para guardar los cambios cuando se presiona el botón de guardar
document.getElementById("save_button").addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    saveUserData(); // Llamada a la función para guardar los datos
});

// Ejecutar la carga de datos del usuario al cargar la página
document.addEventListener("DOMContentLoaded", loadUserData);
