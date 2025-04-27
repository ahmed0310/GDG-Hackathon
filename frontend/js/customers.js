document.addEventListener('DOMContentLoaded', function() {
    // Populate customers table
    populateCustomersTable();
    
    // Search functionality
    const searchInput = document.getElementById('customer-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterCustomers(searchTerm);
    });
});

// Populate customers table
function populateCustomersTable() {
    const tableBody = document.getElementById('customers-table-body');
    tableBody.innerHTML = '';
    
    customersData.forEach(customer => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${customer.avatar || 'img/avatars/default.jpg'}" alt="${customer.name}" class="avatar" style="width: 40px; height: 40px;">
                    <div>
                        <div style="font-weight: 500;">${customer.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-light);">${customer.id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div>${customer.email}</div>
                <div style="color: var(--text-light);">${customer.phone}</div>
            </td>
            <td>${customer.orders}</td>
            <td>${customer.totalSpent}</td>
            <td>${customer.lastOrder}</td>
            <td><span class="badge ${statusColors[customer.status]}">${capitalizeFirstLetter(customer.status)}</span></td>
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

// Filter customers based on search term
function filterCustomers(searchTerm) {
    const tableRows = document.querySelectorAll('#customers-table-body tr');
    
    tableRows.forEach(row => {
        const customerName = row.querySelector('td:first-child div div:first-child').textContent.toLowerCase();
        const customerId = row.querySelector('td:first-child div div:last-child').textContent.toLowerCase();
        const customerEmail = row.querySelector('td:nth-child(2) div:first-child').textContent.toLowerCase();
        
        if (customerName.includes(searchTerm) || customerId.includes(searchTerm) || customerEmail.includes(searchTerm)) {
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