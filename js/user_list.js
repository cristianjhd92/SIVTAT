// Función para inicializar un usuario predeterminado si LocalStorage está vacío
function initializeDefaultUser() {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Obtener usuarios de LocalStorage o crear un array vacío si no hay usuarios
    
    // Verificar si no hay usuarios en LocalStorage
    if (users.length === 0) {
        const defaultUser = {
            firstName: "Admin",
            lastName: "User",
            email: "admin@empresa.com",
            password: "1234", // Nota: Contraseñas en texto plano solo para pruebas
            role: "administrador",
            status: "activo",
            store: ""
        };

        // Agregar el usuario predeterminado al array de usuarios y guardar en LocalStorage
        users.push(defaultUser); // Push para agregar un elemento al final del array
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Función para cargar los usuarios desde LocalStorage y mostrarlos en la tabla
function loadUsers() {
    initializeDefaultUser(); // Asegura que el usuario predeterminado esté inicializado
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableBody = document.getElementById("user_table_body");

    // Limpiar el contenido actual de la tabla
    userTableBody.innerHTML = "";

    // Crear filas para cada usuario
    users.forEach((user, index) => {
        const row = document.createElement("tr");

        // Crear celdas para cada propiedad del usuario con .innerHTML set para evitar inyección de código
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="action_button edit_button" onclick="editUser(${index})">Editar</button>
                <button class="action_button delete_button" onclick="deleteUser(${index})">Borrar</button>
            </td>
        `;

        userTableBody.appendChild(row); // Agregar la fila a la tabla con .appendChild
    });
}

// Función para borrar un usuario y actualizar la tabla
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1); // Eliminar usuario en el índice especificado
    localStorage.setItem("users", JSON.stringify(users)); // Guardar cambios en LocalStorage
    loadUsers(); // Recargar la tabla de usuarios
}

// Función para redirigir a la página de edición con el índice del usuario en la URL
function editUser(index) {
    window.location.href = `edit_user.html?userId=${index}`; // Redirigir a la página de edición con el índice del usuario en la URL
}

// Ejecutar la carga inicial de usuarios al cargar la página
document.addEventListener("DOMContentLoaded", loadUsers);
