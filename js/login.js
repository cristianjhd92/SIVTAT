//getElementById("login_form") devuelve el elemento con el id "login_form"
//addEventListener("submit", function(event) { ... }) agrega un evento de escucha al formulario para cuando se envía
document.getElementById("login_form").addEventListener("submit", function(event) {
    const username = event.target.username.value; // Obtiene el valor del campo de entrada de nombre de usuario
    const password = event.target.password.value; // Obtiene el valor del campo de entrada de contraseña
    
    // Confirma si el nombre de usuario y la contraseña están vacíos
    if (username.trim() === "" || password.trim() === "") { //.trim elimina los espacios en blanco al principio y al final de una cadena
        event.preventDefault(); // Previene el envío del formulario en caso de que los campos estén vacíos
        alert("Por favor, complete todos los campos."); // Notifica al usuario que debe completar todos los campos
    }
});

// Seleccionar el formulario de login
document.getElementById("login_form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const username = event.target.username.value; // Nombre de usuario ingresado
    const password = event.target.password.value; // Contraseña ingresada

    // Credenciales del usuario predeterminado
    const defaultUser = { username: "Admin", password: "1234" };

    // Verificar si el usuario es el predeterminado
    if (username === defaultUser.username && password === defaultUser.password) {
        window.location.href = "main.html"; // Redirige al main si las credenciales son correctas
        return;
    }

    // Obtener usuarios almacenados en Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];//.parse para convertir el string en un array y si no existe lo crea como un array vacío
    
    // Buscar usuario en el almacenamiento local
    const userFound = users.find(user => user.firstName === username && user.password === password);

    if (userFound) {
        // Redirigir al main si el usuario es válido
        window.location.href = "main.html";
    } else {
        // Notificar si las credenciales son incorrectas
        alert("Usuario o contraseña incorrectos.");
    }
});
