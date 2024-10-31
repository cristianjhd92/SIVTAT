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
