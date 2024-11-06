// Al hacer clic en el botón para crear una tienda, se captura la acción del formulario
document.getElementById("create_store_button").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Captura los valores de los campos del formulario
    const storeName = document.getElementById("store_name").value;
    const storeAddress = document.getElementById("store_address").value;
    const storePhone = document.getElementById("store_phone").value;
    const storeStatus = document.getElementById("store_status").value;

    // Verificar que todos los campos estén completos
    if (!storeName || !storeAddress || !storePhone) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto para la nueva tienda con la información ingresada
    const newStore = {
        name: storeName,
        address: storeAddress,
        phone: storePhone,
        status: storeStatus
    };

    // Obtener las tiendas existentes en el Local Storage o crear un array vacío
    const stores = JSON.parse(localStorage.getItem("stores")) || [];
    stores.push(newStore); // Añadir la nueva tienda al array

    // Guardar el array actualizado de tiendas en el Local Storage
    localStorage.setItem("stores", JSON.stringify(stores));

    // Redirigir a la página de lista de tiendas después de guardar
    window.location.href = "store_list.html";
});
