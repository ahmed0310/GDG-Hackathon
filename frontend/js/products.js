document.addEventListener('DOMContentLoaded', function() {
    // Populate products grid
    populateProductsGrid();
    
    // Search functionality
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterProducts(searchTerm);
    });
    
    // Category filter functionality
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        filterProductsByCategory(selectedCategory);
    });
});

// Populate products grid
function populateProductsGrid() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image || 'img/products/default.jpg'}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-header">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-id">${product.id}</p>
                    </div>
                    <div class="product-actions">
                        <button class="btn icon-btn">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="info-row">
                        <span class="info-label">Category:</span>
                        <span class="info-value">${product.category}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Price:</span>
                        <span class="info-value">${product.price}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Stock:</span>
                        <span class="info-value">${product.stock} units</span>
                    </div>
                </div>
                <div class="product-status">
                    <span class="badge ${statusColors[product.status]}">${formatStatus(product.status)}</span>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Filter products based on search term
function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productId = card.querySelector('.product-id').textContent.toLowerCase();
        const productCategory = card.querySelector('.info-value').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productId.includes(searchTerm) || productCategory.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter products based on category
function filterProductsByCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    if (category === 'all') {
        productCards.forEach(card => {
            card.style.display = '';
        });
        return;
    }
    
    productCards.forEach(card => {
        const productCategory = card.querySelector('.info-value').textContent.toLowerCase();
        
        if (productCategory.toLowerCase() === category.toLowerCase()) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Format status for display
function formatStatus(status) {
    if (status === 'made-to-order') {
        return 'Made to Order';
    }
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ');
}