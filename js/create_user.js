// Función para mostrar u ocultar los campos de tienda o conductor según el rol seleccionado
function toggleFields() { //toggleFields es el nombre de la función que se ejecuta cuando se selecciona un rol
    const role = document.getElementById('role').value; //role es la variable que guarda el valor del rol seleccionado
    const storeField = document.getElementById('store_field');
    const driverField = document.getElementById('driver_field');
    const storeSelect = document.getElementById('store');

    // Si el rol es vendedor, mostrar el campo de tienda y ocultar el de conductor
    if (role === 'vendedor') {
        storeField.style.display = 'block';
        driverField.style.display = 'none';
        storeSelect.value = ''; // Restablecer la tienda para selección manual
    } else if (role === 'conductor') {
        driverField.style.display = 'block';
        storeField.style.display = 'none';
    } else {
        storeField.style.display = 'block';
        driverField.style.display = 'none';
        storeSelect.value = 'Store La Junior'; // Establecer la tienda predeterminada para roles distintos a vendedor y conductor
    }
}

// Función para guardar el nuevo usuario en Local Storage
function saveNewUser() {
    const firstName = document.getElementById('first_name').value; //.value obtiene el valor del input
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;
    const store = role === 'vendedor' || role === 'gerente' ? document.getElementById('store').value : ''; // Si el rol es vendedor o gerente, se obtiene el valor del select de tienda
    const driver = role === 'conductor' ? document.getElementById('driver').value : ''; // Si el rol es conductor, se obtiene el valor del select de conductor

    // Crear el objeto del nuevo usuario
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
    const users = JSON.parse(localStorage.getItem('users')) || []; // Se trabaja con JSON para almacenar objetos complejos en Local Storage
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

// Llama a la función toggleFields al cargar la página para aplicar el valor predeterminado si no hay rol seleccionado
document.addEventListener('DOMContentLoaded', toggleFields); // DOMContentLoaded se ejecuta cuando el documento HTML está completamente cargado y analizado
