// Función para cargar la lista de conductores y vehículos con sus asignaciones
function loadDriverAndVehicleLists() {
    const drivers = JSON.parse(localStorage.getItem("users")) || [];
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    const driverListBody = document.getElementById("driver_list_body");
    const vehicleListBody = document.getElementById("vehicle_list_body");

    driverListBody.innerHTML = "";
    vehicleListBody.innerHTML = "";

    // Cargar la lista de conductores o mostrar mensaje de lista vacía
    const driverConductorList = drivers.filter(driver => driver.role === "conductor");
    if (driverConductorList.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3" class="empty_message">No hay conductores</td>`;
        driverListBody.appendChild(row);
    } else {
        driverConductorList.forEach(driver => {
            const assignedVehicle = vehicles.find(vehicle => vehicle.driver === `${driver.firstName} ${driver.lastName}`);
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${driver.firstName} ${driver.lastName}</td>
                <td>${assignedVehicle ? assignedVehicle.plate : "Sin vehículo asignado"}</td>
                <td>
                    <button class="action_button edit_button" onclick="editDriver('${driver.firstName}', '${driver.lastName}')">Editar</button>
                    <button class="action_button delete_button" onclick="deleteDriver('${driver.firstName}', '${driver.lastName}')">Borrar</button>
                </td>
            `;
            driverListBody.appendChild(row);
        });
    }

    // Cargar la lista de vehículos o mostrar mensaje de lista vacía
    if (vehicles.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4" class="empty_message">No hay vehículos</td>`;
        vehicleListBody.appendChild(row);
    } else {
        vehicles.forEach(vehicle => {
            const assignedDriver = drivers.find(driver => `${driver.firstName} ${driver.lastName}` === vehicle.driver);
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${vehicle.plate}</td>
                <td>${vehicle.model}</td>
                <td>${assignedDriver ? `${assignedDriver.firstName} ${assignedDriver.lastName}` : "Sin conductor asignado"}</td>
                <td>
                    <button class="action_button edit_button" onclick="editVehicle('${vehicle.plate}')">Editar</button>
                    <button class="action_button delete_button" onclick="deleteVehicle('${vehicle.plate}')">Borrar</button>
                </td>
            `;
            vehicleListBody.appendChild(row);
        });
    }
}

// Función para redirigir a la edición del usuario (conductor)
function editDriver(firstName, lastName) {
    const drivers = JSON.parse(localStorage.getItem("users")) || [];
    const driver = drivers.find(driver => driver.firstName === firstName && driver.lastName === lastName);
    
    if (driver) {
        window.location.href = `edit_user.html?userId=${drivers.indexOf(driver)}`; // Redirigir a la edición de usuario
    }
}

// Función para editar un vehículo
function editVehicle(plate) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicle = vehicles.find(vehicle => vehicle.plate === plate);
    
    if (vehicle) {
        window.location.href = `edit_vehicle.html?vehicleId=${vehicles.indexOf(vehicle)}`; // Redirigir a la edición del vehículo
    }
}

// Funciones de eliminación se mantienen igual
function deleteDriver(firstName, lastName) {
    const drivers = JSON.parse(localStorage.getItem("users")) || [];
    const driverIndex = drivers.findIndex(driver => driver.firstName === firstName && driver.lastName === lastName);
    
    if (driverIndex !== -1) {
        drivers.splice(driverIndex, 1);
        localStorage.setItem("users", JSON.stringify(drivers));
        loadDriverAndVehicleLists();
    }
}

function deleteVehicle(plate) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicleIndex = vehicles.findIndex(vehicle => vehicle.plate === plate);
    
    if (vehicleIndex !== -1) {
        vehicles.splice(vehicleIndex, 1);
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
        loadDriverAndVehicleLists();
    }
}

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", loadDriverAndVehicleLists);
