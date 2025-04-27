document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get current cart count
            let count = parseInt(cartCount.textContent);
            // Increment count
            count++;
            // Update cart count
            cartCount.textContent = count;
            
            // Show added to cart message
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#10b981';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Product filtering functionality (for products page)
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const productCards = document.querySelectorAll('.product-card');
    const productsCount = document.getElementById('products-count');
    
    if (categoryFilters.length > 0 && productCards.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                const category = this.value;
                let visibleCount = 0;
                
                productCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (productsCount) {
                    productsCount.textContent = visibleCount;
                }
            });
        });
    }

    // Price range slider (for products page)
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            const value = this.value;
            priceValue.textContent = `$${value}${value == 100 ? '+' : ''}`;
            
            // Filter products by price
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const price = parseFloat(card.dataset.price);
                if (price <= value) {
                    if (card.style.display !== 'none') {
                        visibleCount++;
                    }
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (productsCount) {
                productsCount.textContent = visibleCount;
            }
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Reset category filters
            const allCategoryFilter = document.querySelector('input[name="category"][value="all"]');
            if (allCategoryFilter) {
                allCategoryFilter.checked = true;
            }
            
            // Reset price range
            if (priceRange) {
                priceRange.value = 100;
                priceValue.textContent = '$100+';
            }
            
            // Reset dietary filters
            const dietaryFilters = document.querySelectorAll('input[name="dietary"]');
            dietaryFilters.forEach(filter => {
                filter.checked = false;
            });
            
            // Show all products
            productCards.forEach(card => {
                card.style.display = '';
            });
            
            if (productsCount) {
                productsCount.textContent = productCards.length;
            }
        });
    }

    // Sort products functionality
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect && productCards.length > 0) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productsGrid = document.querySelector('.products-grid');
            const productsArray = Array.from(productCards);
            
            // Sort products based on selected option
            productsArray.sort((a, b) => {
                if (sortValue === 'price-low') {
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                } else if (sortValue === 'price-high') {
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                } else if (sortValue === 'name-asc') {
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                } else if (sortValue === 'name-desc') {
                    return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
                }
                return 0;
            });
            
            // Remove all products from grid
            productCards.forEach(card => {
                card.remove();
            });
            
            // Add sorted products back to grid
            productsArray.forEach(card => {
                productsGrid.appendChild(card);
            });
        });
    }

    // Cart quantity buttons
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    if (quantityBtns.length > 0) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                
                if (this.classList.contains('decrease')) {
                    if (value > 1) {
                        value--;
                    }
                } else if (this.classList.contains('increase')) {
                    if (value < 10) {
                        value++;
                    }
                }
                
                input.value = value;
                updateCartTotal();
            });
        });
    }

    // Remove item from cart
    const removeItemBtns = document.querySelectorAll('.remove-item-btn');
    
    if (removeItemBtns.length > 0) {
        removeItemBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                cartItem.remove();
                updateCartTotal();
                
                // Update cart count
                let count = parseInt(cartCount.textContent);
                count--;
                cartCount.textContent = count;
            });
        });
    }

    // Clear cart button
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => {
                item.remove();
            });
            updateCartTotal();
            
            // Reset cart count
            cartCount.textContent = '0';
        });
    }

    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }

    // Apply promo code
    const applyPromoBtn = document.querySelector('.apply-promo-btn');
    
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.querySelector('.promo-input');
            const promoCode = promoInput.value.trim().toUpperCase();
            
            if (promoCode === 'WEEKEND15') {
                alert('Promo code applied! 15% discount added.');
                updateCartTotal(0.15);
            } else {
                alert('Invalid promo code. Please try again.');
            }
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Proceeding to checkout...');
            // In a real application, this would redirect to a checkout page
        });
    }

    // Function to update cart total
    function updateCartTotal(discount = 0) {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            subtotal += price * quantity;
        });
        
        const shipping = cartItems.length > 0 ? 5 : 0;
        const tax = subtotal * 0.09;
        let total = subtotal + shipping + tax;
        
        // Apply discount if any
        if (discount > 0) {
            const discountAmount = subtotal * discount;
            total -= discountAmount;
        }
        
        // Update summary values
        const summaryRows = document.querySelectorAll('.summary-row');
        if (summaryRows.length >= 4) {
            summaryRows[0].querySelector('span:last-child').textContent = `$${subtotal.toFixed(2)}`;
            summaryRows[1].querySelector('span:last-child').textContent = `$${shipping.toFixed(2)}`;
            summaryRows[2].querySelector('span:last-child').textContent = `$${tax.toFixed(2)}`;
            summaryRows[3].querySelector('span:last-child').textContent = `$${total.toFixed(2)}`;
        }
    }
});