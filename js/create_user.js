// Función para guardar el nuevo usuario en Local Storage
function saveNewUser() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;

    // Definir valores predeterminados para los campos "store" y "driver" según el rol seleccionado
    let store;
    let driver;

    if (role === 'vendedor') {
        store = "Sin Asignar"; // Vendedores comienzan sin asignación de tienda
        driver = "";           // No se asigna vehículo
    } else if (role === 'conductor') {
        store = "";            // No se asigna tienda
        driver = "Sin Asignar"; // Conductores comienzan sin asignación de vehículo
    } else {
        store = "Store La Junior"; // Para roles distintos de vendedor y conductor
        driver = "";               // No se asigna vehículo
    }

    // Crear el objeto del nuevo usuario con los valores predeterminados
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        role,
        status,
        store,
        driver
    };

    // Obtener usuarios existentes de Local Storage o crear un nuevo array si no existen
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser); // Agregar el nuevo usuario al array de usuarios
    localStorage.setItem('users', JSON.stringify(users)); // Guardar el array actualizado en Local Storage

    // Redirigir a la lista de usuarios
    window.location.href = 'user_list.html';
}

// Asignar la función de guardado al botón de creación de usuario
document.getElementById('create_user_button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    saveNewUser(); // Guardar el nuevo usuario
});
