<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Success Bakery - Customer Portal</title>
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
            <a href="index.html" class="active"><i class="fas fa-home"></i> Home</a>
            <a href="products.html"><i class="fas fa-cookie"></i> Products</a>
            <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
            <a href="{{ route('cusCart') }}" class="cart-link">
                <i class="fas fa-shopping-cart"></i> Cart
                <span class="cart-count">0</span>
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
            <a href="index.html" class="active"><i class="fas fa-home"></i> Home</a>
            <a href="products.html"><i class="fas fa-cookie"></i> Products</a>
            <a href="orders.html"><i class="fas fa-shopping-bag"></i> My Orders</a>
            <a href="{{ route('cusCart') }}"><i class="fas fa-shopping-cart"></i> Cart</a>
            <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
            <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
            <a href="../landing.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </nav>
    </div>

    <main class="content">
        <!-- Hero Banner -->
        <section class="hero-banner">
            <div class="hero-content">
                <h1>Welcome back, John!</h1>
                <p>Discover our freshly baked goods and place your order today.</p>
                <a href="products.html" class="btn primary-btn">Browse Products</a>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="section">
            <div class="section-header">
                <h2>Featured Products</h2>
                <a href="products.html" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-badge">Popular</div>
                    <div class="product-image">
                        <img src="img/products/chocolate-cake.jpg" alt="Chocolate Cake">
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-info">
                        <h3>Chocolate Cake</h3>
                        <p class="product-category">Cakes</p>
                        <div class="product-price">$35.00</div>
                        <button class="btn add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="img/products/vanilla-cupcakes.jpg" alt="Vanilla Cupcakes">
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-info">
                        <h3>Vanilla Cupcakes (6)</h3>
                        <p class="product-category">Cupcakes</p>
                        <div class="product-price">$18.00</div>
                        <button class="btn add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-badge">New</div>
                    <div class="product-image">
                        <img src="img/products/sourdough-bread.jpg" alt="Sourdough Bread">
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-info">
                        <h3>Sourdough Bread</h3>
                        <p class="product-category">Bread</p>
                        <div class="product-price">$6.25</div>
                        <button class="btn add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>

                <div class="product-card">
                    <div class="product-image">
                        <img src="img/products/croissants.jpg" alt="Croissants">
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                    <div class="product-info">
                        <h3>Croissants (4)</h3>
                        <p class="product-category">Pastries</p>
                        <div class="product-price">$12.00</div>
                        <button class="btn add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Recent Orders -->
        <section class="section">
            <div class="section-header">
                <h2>Recent Orders</h2>
                <a href="orders.html" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="orders-list">
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <h3>Order #ORD-1234</h3>
                            <p class="order-date">April 25, 2023</p>
                        </div>
                        <span class="order-status completed">Completed</span>
                    </div>
                    <div class="order-items">
                        <div class="order-item">
                            <img src="img/products/chocolate-cake.jpg" alt="Chocolate Cake">
                            <div class="item-details">
                                <h4>Chocolate Cake</h4>
                                <p>Quantity: 1</p>
                            </div>
                            <div class="item-price">$35.00</div>
                        </div>
                        <div class="order-item">
                            <img src="img/products/vanilla-cupcakes.jpg" alt="Vanilla Cupcakes">
                            <div class="item-details">
                                <h4>Vanilla Cupcakes (6)</h4>
                                <p>Quantity: 1</p>
                            </div>
                            <div class="item-price">$18.00</div>
                        </div>
                    </div>
                    <div class="order-footer">
                        <div class="order-total">
                            <span>Total:</span>
                            <span class="total-amount">$53.00</span>
                        </div>
                        <button class="btn outline-btn">Reorder</button>
                    </div>
                </div>

                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <h3>Order #ORD-1189</h3>
                            <p class="order-date">April 18, 2023</p>
                        </div>
                        <span class="order-status completed">Completed</span>
                    </div>
                    <div class="order-items">
                        <div class="order-item">
                            <img src="img/products/sourdough-bread.jpg" alt="Sourdough Bread">
                            <div class="item-details">
                                <h4>Sourdough Bread</h4>
                                <p>Quantity: 2</p>
                            </div>
                            <div class="item-price">$12.50</div>
                        </div>
                    </div>
                    <div class="order-footer">
                        <div class="order-total">
                            <span>Total:</span>
                            <span class="total-amount">$12.50</span>
                        </div>
                        <button class="btn outline-btn">Reorder</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Special Offers -->
        <section class="section">
            <div class="section-header">
                <h2>Special Offers</h2>
            </div>
            <div class="offers-grid">
                <div class="offer-card">
                    <div class="offer-content">
                        <h3>Weekend Special</h3>
                        <p>Get 15% off on all cake orders this weekend!</p>
                        <p class="offer-code">Use code: <strong>WEEKEND15</strong></p>
                        <a href="products.html?category=cakes" class="btn primary-btn">Shop Now</a>
                    </div>
                    <div class="offer-image">
                        <img src="img/offers/weekend-special.jpg" alt="Weekend Special">
                    </div>
                </div>

                <div class="offer-card">
                    <div class="offer-content">
                        <h3>Birthday Package</h3>
                        <p>Complete birthday package with cake, cupcakes, and cookies!</p>
                        <p class="offer-price">Starting at <strong>$75.00</strong></p>
                        <a href="products.html?category=packages" class="btn primary-btn">Learn More</a>
                    </div>
                    <div class="offer-image">
                        <img src="img/offers/birthday-package.jpg" alt="Birthday Package">
                    </div>
                </div>
            </div>
        </section>
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