// Obtener el ID del vehículo desde la URL
function getVehicleIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("vehicleId");
}

// Cargar datos del vehículo en el formulario
function loadVehicleData() {
    const vehicleId = getVehicleIdFromURL();
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicle = vehicles[vehicleId];

    if (vehicle) {
        // Cargar los valores en el formulario
        document.getElementById("plate").value = vehicle.plate; // Placa inmutable
        document.getElementById("model").value = vehicle.model;
        document.getElementById("brand").value = vehicle.brand;
        document.getElementById("status").value = vehicle.status;
    }
}

// Guardar cambios en el vehículo
function saveVehicleData() {
    const vehicleId = getVehicleIdFromURL();
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    
    // Actualizar datos del vehículo
    vehicles[vehicleId] = {
        plate: document.getElementById("plate").value,
        model: document.getElementById("model").value,
        brand: document.getElementById("brand").value,
        status: document.getElementById("status").value,
    };

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    // Redirigir a la lista de vehículos
    window.location.href = "vehicle_list.html";
}

// Evento para guardar cambios al hacer clic en "Guardar Cambios"
document.getElementById("save_changes_button").addEventListener("click", (event) => {
    event.preventDefault();
    saveVehicleData();
});

// Ejecutar la carga de datos del vehículo al cargar la página
document.addEventListener("DOMContentLoaded", loadVehicleData);
