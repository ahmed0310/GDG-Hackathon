document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Populate recent orders table
    populateOrdersTable();

    // Populate upcoming orders
    populateUpcomingOrders();

    // Initialize charts
    initCharts();

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter orders based on tab
            const tabValue = this.getAttribute('data-tab');
            populateOrdersTable(tabValue);
        });
    });
});

// Populate orders table
function populateOrdersTable(filter = 'recent') {
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';
    
    // Filter orders based on tab
    let filteredOrders = ordersData;
    if (filter === 'pending') {
        filteredOrders = ordersData.filter(order => order.status === 'pending');
    } else if (filter === 'completed') {
        filteredOrders = ordersData.filter(order => order.status === 'completed');
    }
    
    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${order.customer.avatar || 'img/avatars/default.jpg'}" alt="${order.customer.name}" class="avatar" style="width: 32px; height: 32px;">
                    <div>
                        <div style="font-weight: 500;">${order.customer.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-light);">${order.customer.email}</div>
                    </div>
                </div>
            </td>
            <td>${order.items}</td>
            <td>${order.date}</td>
            <td>${order.amount}</td>
            <td><span class="badge ${statusColors[order.status]}">${capitalizeFirstLetter(order.status)}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Populate upcoming orders
function populateUpcomingOrders() {
    const upcomingList = document.getElementById('upcoming-orders-list');
    upcomingList.innerHTML = '';
    
    upcomingOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'upcoming-item';
        
        orderElement.innerHTML = `
            <div class="upcoming-header">
                <div class="upcoming-customer">${order.customer}</div>
                <div class="upcoming-id">${order.id}</div>
            </div>
            <div class="upcoming-date">
                <i class="fas fa-calendar"></i>
                ${order.date} at ${order.time}
            </div>
            <div class="upcoming-items">
                <i class="fas fa-birthday-cake"></i>
                ${order.items}
            </div>
            ${order.notes ? `<div class="upcoming-notes">${order.notes}</div>` : ''}
        `;
        
        upcomingList.appendChild(orderElement);
    });
}

// Initialize charts
function initCharts() {
    // Sales chart
    const salesCtx = document.getElementById('sales-chart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: salesData.map(item => item.day),
            datasets: [{
                label: 'Sales ($)',
                data: salesData.map(item => item.sales),
                backgroundColor: '#f59e0b',
                borderColor: '#d97706',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Product distribution chart
    const productCtx = document.getElementById('product-chart').getContext('2d');
    new Chart(productCtx, {
        type: 'pie',
        data: {
            labels: productDistribution.map(item => item.category),
            datasets: [{
                label: 'Product Distribution',
                data: productDistribution.map(item => item.value),
                backgroundColor: [
                    '#f59e0b',
                    '#d97706',
                    '#b45309',
                    '#92400e',
                    '#78350f'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}