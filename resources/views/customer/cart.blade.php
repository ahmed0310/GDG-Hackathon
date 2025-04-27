<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart - Sweet Success Bakery</title>
    <link rel="stylesheet" href="{{ asset('css/customer-styles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <i class="fas fa-birthday-cake"></i>
            <h1>Sweet Success</h1>
        </div>
        <nav class="nav-links">
            <a href="index.html"><i class="fas fa-home"></i> Home</a>
            <a href="products.html"><i class="fas fa-cookie"></i> Products</a>
            <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
            <a href="cart.html" class="active cart-link">
                <i class="fas fa-shopping-cart"></i> Cart
                <span class="cart-count">3</span>
            </a>
        </nav>
        <div class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </div>
        <div class="user-menu">
            <img src="img/user-avatar.jpg" alt="User" class="avatar">
            <span>John Doe</span>
            <i class="fas fa-chevron-down"></i>
            <div class="dropdown-menu">
                <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                <a href="orders.html"><i class="fas fa-list"></i> My Orders</a>
                <a href="favorites.html"><i class="fas fa-heart"></i> Favorites</a>
                <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
                <div class="divider"></div>
                <a href="../landing.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    </header>

    <div class="mobile-nav">
        <div class="mobile-nav-header">
            <div class="logo">
                <i class="fas fa-birthday-cake"></i>
                <h1>Sweet Success</h1>
            </div>
            <button class="close-menu-btn"><i class="fas fa-times"></i></button>
        </div>
        <nav>
            <a href="index.html"><i class="fas fa-home"></i> Home</a>
            <a href="products.html"><i class="fas fa-cookie"></i> Products</a>
            <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
            <a href="cart.html" class="active"><i class="fas fa-shopping-cart"></i> Cart</a>
            <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
            <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
            <a href="../landing.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </nav>
    </div>

    <main class="content">
        <div class="page-header">
            <h1>Shopping Cart</h1>
            <p>Review your items and proceed to checkout</p>
        </div>

        <div class="cart-container">
            <div class="cart-items">
                <div class="cart-item">
                    <div class="item-image">
                        <img src="img/products/chocolate-cake.jpg" alt="Chocolate Cake">
                    </div>
                    <div class="item-details">
                        <h3>Chocolate Cake</h3>
                        <p class="item-category">Cakes</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" min="1" max="10" class="quantity-input">
                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="item-price">$35.00</div>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>

                <div class="cart-item">
                    <div class="item-image">
                        <img src="img/products/vanilla-cupcakes.jpg" alt="Vanilla Cupcakes">
                    </div>
                    <div class="item-details">
                        <h3>Vanilla Cupcakes (6)</h3>
                        <p class="item-category">Cupcakes</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" min="1" max="10" class="quantity-input">
                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="item-price">$18.00</div>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>

                <div class="cart-item">
                    <div class="item-image">
                        <img src="img/products/sourdough-bread.jpg" alt="Sourdough Bread">
                    </div>
                    <div class="item-details">
                        <h3>Sourdough Bread</h3>
                        <p class="item-category">Bread</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" min="1" max="10" class="quantity-input">
                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="item-price">$6.25</div>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>

                <div class="cart-actions">
                    <button class="btn outline-btn continue-shopping-btn">
                        <i class="fas fa-arrow-left"></i> Continue Shopping
                    </button>
                    <button class="btn outline-btn clear-cart-btn">
                        <i class="fas fa-trash"></i> Clear Cart
                    </button>
                </div>
            </div>

            <div class="cart-summary">
                <h2>Order Summary</h2>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$59.25</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>$5.00</span>
                </div>
                <div class="summary-row">
                    <span>Tax</span>
                    <span>$5.33</span>
                </div>
                <div class="summary-divider"></div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$69.58</span>
                </div>

                <div class="promo-code">
                    <input type="text" placeholder="Promo Code" class="promo-input">
                    <button class="btn outline-btn apply-promo-btn">Apply</button>
                </div>

                <button class="btn primary-btn checkout-btn">
                    Proceed to Checkout
                </button>

                <div class="payment-methods">
                    <p>We Accept:</p>
                    <div class="payment-icons">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fab fa-cc-amex"></i>
                        <i class="fab fa-cc-paypal"></i>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo">
                    <i class="fas fa-birthday-cake"></i>
                    <h2>Sweet Success</h2>
                </div>
                <p>Delicious baked goods made with the finest ingredients. Serving our community since 2010.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-pinterest"></i></a>
                </div>
            </div>

            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="orders.html">Order Tracking</a></li>
                    <li><a href="returns.html">Returns & Refunds</a></li>
                    <li><a href="shipping.html">Shipping Information</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms & Conditions</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Contact Us</h3>
                <p><i class="fas fa-map-marker-alt"></i> 123 Main Street, Bakersville, CA 90210</p>
                <p><i class="fas fa-phone"></i> (555) 123-4567</p>
                <p><i class="fas fa-envelope"></i> contact@sweetsuccessbakery.com</p>
                <p><i class="fas fa-clock"></i> Mon-Fri: 7am-7pm, Sat: 8am-5pm, Sun: 9am-3pm</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 Sweet Success Bakery. All rights reserved.</p>
        </div>
    </footer>

    <script src="{{ asset('js/customer-script.js') }}"></script>
</body>
</html>