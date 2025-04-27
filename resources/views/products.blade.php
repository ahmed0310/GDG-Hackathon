<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Success CRM | Products</title>
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <link rel="stylesheet" href="{{asset('css/products.css')}}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="logo">
                <i class="fas fa-birthday-cake"></i>
                <h1>Sweet Success</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="{{ route('home') }}"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="{{ route('Customers') }}"><i class="fas fa-users"></i> Customers</a></li>
                    <li><a href="{{ route('Orders') }}"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                    <li class="active"><a href="{{ route('Products') }}"><i class="fas fa-cookie"></i> Products</a></li>
                    <li ><a href="{{ route('Calendar') }}"><i class="fas fa-calendar-alt"></i> Calendar</a></li>
                    <li><a href="{{ route('Settings') }}"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <header>
                <div class="page-title">
                    <h1>Products</h1>
                </div>
                <div class="header-actions">
                    <button class="btn primary-btn">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                </div>
            </header>

            <!-- Products Content -->
            <div class="products-container">
                <div class="card">
                    <div class="card-header">
                        <h2>Product Catalog</h2>
                        <p>Manage your bakery products and inventory</p>
                    </div>
                    <div class="card-body">
                        <div class="table-actions">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" id="product-search" placeholder="Search products...">
                            </div>
                            <div class="action-buttons">
                                <select id="category-filter" class="select-input">
                                    <option value="all">All Categories</option>
                                    <option value="cakes">Cakes</option>
                                    <option value="cupcakes">Cupcakes</option>
                                    <option value="bread">Bread</option>
                                    <option value="pastries">Pastries</option>
                                    <option value="cookies">Cookies</option>
                                </select>
                                <button class="btn outline-btn">
                                    <i class="fas fa-filter"></i> Filter
                                </button>
                            </div>
                        </div>

                        <div class="products-grid" id="products-grid">
                            <!-- Products will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="{{asset('js/data.js')}}"></script>
    <script src="{{asset('js/products.js')}}"></script>
</body>
</html>