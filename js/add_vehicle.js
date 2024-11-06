// Función para guardar el nuevo vehículo en Local Storage
function saveNewVehicle() {
    // Obtener los valores de los campos de entrada
    const plate = document.getElementById('plate').value;
    const model = document.getElementById('model').value;
    const brand = document.getElementById('brand').value;
    const status = document.getElementById('status').value;

    // Crear el objeto del nuevo vehículo con los valores obtenidos
    const newVehicle = {
        plate,
        model,
        brand,
        status
    };

    // Obtener vehículos existentes de Local Storage o crear un nuevo array si no existen
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(newVehicle); // Agregar el nuevo vehículo al array de vehículos
    localStorage.setItem('vehicles', JSON.stringify(vehicles)); // Guardar el array actualizado en Local Storage

    // Redirigir a la lista de vehículos
    window.location.href = 'vehicle_list.html';
}

// Asignar la función de guardado al botón de creación de vehículo
document.getElementById('add_vehicle_button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    saveNewVehicle(); // Guardar el nuevo vehículo
});
