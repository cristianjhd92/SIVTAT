// Cargar datos iniciales al cargar el DOM
document.addEventListener("DOMContentLoaded", loadDashboardData);

// Función para cargar los datos del dashboard desde localStorage
function loadDashboardData() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Calcular el total de ventas sumando el subtotal de cada orden, sin decimales
    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.orderTotal.replace('$', '')) || 0, 0);
    document.getElementById("total-sales").textContent = `$${totalSales.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

    // Mostrar total de órdenes
    document.getElementById("total-orders").textContent = orders.length;

    // Calcular el promedio de venta por orden
    const averageOrderValue = orders.length > 0 ? (totalSales / orders.length) : 0;
    document.getElementById("average-order-value").textContent = `$${averageOrderValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

    // Mostrar usuarios activos
    document.getElementById("active-users").textContent = users.length;

    // Cargar gráficos (si no hay órdenes, usar datos de muestra)
    renderOrderStatusChart(orders.length ? orders : getSampleOrders());
    renderSalesChart(orders);
}

// Función de datos simulados para prueba de gráficos
function getSampleOrders() {
    return [
        { paymentStatus: "Pagada", orderTotal: "$100.00", orderDate: "2024-01-15" },
        { paymentStatus: "Pendiente", orderTotal: "$50.00", orderDate: "2024-01-18" },
        { paymentStatus: "Cancelada", orderTotal: "$20.00", orderDate: "2024-02-10" },
        { paymentStatus: "Pagada", orderTotal: "$150.00", orderDate: "2024-02-15" }
    ];
}

// Función para renderizar gráfico de estados de órdenes según el estado de pago
function renderOrderStatusChart(orders) {
    const completed = orders.filter(order => order.paymentStatus === "Pagada").length;
    const pending = orders.filter(order => order.paymentStatus === "Pendiente").length;
    const canceled = orders.filter(order => order.paymentStatus === "Cancelada").length;

    const ctx = document.getElementById("orderStatusChart").getContext("2d");

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Completadas", "Pendientes", "Canceladas"],
            datasets: [{
                data: [completed, pending, canceled],
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Función para renderizar gráfico de ventas mensuales
function renderSalesChart(orders) {
    const monthlySales = {};
    orders.forEach(order => {
        const month = new Date(order.orderDate).toLocaleString("es-ES", { month: "long" });
        const salesValue = parseFloat(order.orderTotal.replace('$', '')) || 0;
        monthlySales[month] = (monthlySales[month] || 0) + salesValue;
    });

    const labels = Object.keys(monthlySales);
    const data = Object.values(monthlySales);

    const ctx = document.getElementById("salesChart").getContext("2d");

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Ventas Mensuales",
                data: data,
                backgroundColor: "#0C254B"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
