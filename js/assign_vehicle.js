// Cargar opciones de vehículos y conductores al iniciar la página
document.addEventListener("DOMContentLoaded", loadOptions);

// Función para cargar vehículos y conductores en los selectores
function loadOptions() {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const drivers = users.filter(user => user.role === "conductor");

    const vehicleSelect = document.getElementById("vehicle");
    const driverSelect = document.getElementById("driver");

    // Cargar opciones de vehículos
    if (vehicles.length === 0) {
        vehicleSelect.innerHTML = '<option value="">Crea un vehículo</option>';
    } else {
        vehicleSelect.innerHTML = '<option value="">Selecciona un vehículo</option>';
        vehicles.forEach(vehicle => {
            if (!vehicle.driver || vehicle.driver === "Sin Conductor Asignado") {
                const option = document.createElement("option");
                option.value = vehicle.plate;
                option.textContent = `${vehicle.plate} - ${vehicle.model}`;
                vehicleSelect.appendChild(option);
            }
        });
    }

    // Cargar opciones de conductores
    if (drivers.length === 0) {
        driverSelect.innerHTML = '<option value="">Crea un conductor</option>';
    } else {
        driverSelect.innerHTML = '<option value="">Selecciona un conductor</option>';
        drivers.forEach(driver => {
            const isAssigned = vehicles.some(vehicle => vehicle.driver === `${driver.firstName} ${driver.lastName}`);
            if (!isAssigned) {
                const option = document.createElement("option");
                option.value = `${driver.firstName} ${driver.lastName}`;
                option.textContent = `${driver.firstName} ${driver.lastName}`;
                driverSelect.appendChild(option);
            }
        });
    }

    // Cargar lista de asignaciones
    loadAssignments();
}

// Asignar conductor al vehículo
document.getElementById("assign_button").addEventListener("click", () => {
    const selectedVehicle = document.getElementById("vehicle").value;
    const selectedDriver = document.getElementById("driver").value;

    if (selectedVehicle && selectedDriver) {
        const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
        
        // Encontrar el vehículo seleccionado y asignarle el conductor
        const vehicleIndex = vehicles.findIndex(vehicle => vehicle.plate === selectedVehicle);
        vehicles[vehicleIndex].driver = selectedDriver;
        
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
        loadOptions(); // Recargar opciones para actualizar la lista de asignaciones
    } else {
        alert("Por favor selecciona un vehículo y un conductor.");
    }
});

// Cargar asignaciones en la tabla
function loadAssignments() {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const assignedDriversList = document.getElementById("assigned_drivers_list");

    assignedDriversList.innerHTML = ""; // Limpiar la lista actual

    if (vehicles.some(vehicle => vehicle.driver && vehicle.driver !== "Sin Conductor Asignado")) {
        vehicles.forEach(vehicle => {
            if (vehicle.driver && vehicle.driver !== "Sin Conductor Asignado") {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td>${vehicle.plate} - ${vehicle.model}</td>
                    <td>${vehicle.driver}</td>
                    <td><button class="delete_button" onclick="removeAssignment('${vehicle.plate}')">Eliminar</button></td>
                `;
                assignedDriversList.appendChild(row);
            }
        });
    } else {
        assignedDriversList.innerHTML = '<tr><td colspan="3" class="no_data">No hay asignaciones</td></tr>';
    }
}

// Eliminar asignación
function removeAssignment(vehiclePlate) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicleIndex = vehicles.findIndex(vehicle => vehicle.plate === vehiclePlate);

    if (vehicleIndex > -1) {
        vehicles[vehicleIndex].driver = "Sin Conductor Asignado";
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
        loadOptions();
    }
}
