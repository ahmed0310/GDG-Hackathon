document.addEventListener('DOMContentLoaded', function() {
    // Populate orders table
    populateOrdersTable();
    
    // Search functionality
    const searchInput = document.getElementById('order-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterOrders(searchTerm);
    });
    
    // Status filter functionality
    const statusFilter = document.getElementById('status-filter');
    statusFilter.addEventListener('change', function() {
        const selectedStatus = this.value;
        filterOrdersByStatus(selectedStatus);
    });
});

// Populate orders table
function populateOrdersTable() {
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';
    
    ordersData.forEach(order => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer.name}</td>
            <td>${order.date}</td>
            <td>${order.items}</td>
            <td>${order.amount}</td>
            <td><span class="badge ${statusColors[order.status]}">${capitalizeFirstLetter(order.status)}</span></td>
            <td><span class="badge ${statusColors[order.paymentStatus]}">${capitalizeFirstLetter(order.paymentStatus)}</span></td>
            <td>
                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                    <button class="btn outline-btn">View</button>
                    <button class="btn outline-btn">Edit</button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter orders based on search term
function filterOrders(searchTerm) {
    const tableRows = document.querySelectorAll('#orders-table-body tr');
    
    tableRows.forEach(row => {
        const orderId = row.querySelector('td:first-child').textContent.toLowerCase();
        const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const orderItems = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        if (orderId.includes(searchTerm) || customerName.includes(searchTerm) || orderItems.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Filter orders based on status
function filterOrdersByStatus(status) {
    const tableRows = document.querySelectorAll('#orders-table-body tr');
    
    if (status === 'all') {
        tableRows.forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    tableRows.forEach(row => {
        const orderStatus = row.querySelector('td:nth-child(6) span').textContent.toLowerCase();
        
        if (orderStatus === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}