<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Success CRM | Customers</title>
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <link rel="stylesheet" href="{{asset('css/customers.css')}}">
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
                    <li><a href="{{ route('Admin') }}"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li class="active"><a href="{{ route('Customers') }}"><i class="fas fa-users"></i> Customers</a></li>
                    <li><a href="{{ route('Orders') }}"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                    <li><a href="{{ route('Products') }}"><i class="fas fa-cookie"></i> Products</a></li>
                    <li ><a href="{{ route('Voice') }}"><i class="fas fa-microphone"></i> Voice Notes</a></li>
                    <li><a href="{{ route('Calendar') }}"><i class="fas fa-calendar-alt"></i> Calendar</a></li>
                    <li><a href="{{ route('Settings') }}"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <header>
                <div class="page-title">
                    <h1>Customers</h1>
                </div>
                <div class="header-actions">
                    <button class="btn primary-btn">
                        <i class="fas fa-plus"></i> Add Customer
                    </button>
                </div>
            </header>

            <!-- Customers Content -->
            <div class="customers-container">
                <div class="card">
                    <div class="card-header">
                        <h2>Customer Management</h2>
                        <p>View and manage your bakery customers</p>
                    </div>
                    <div class="card-body">
                        <div class="table-actions">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" id="customer-search" placeholder="Search customers...">
                            </div>
                            <div class="action-buttons">
                                <button class="btn outline-btn">
                                    <i class="fas fa-filter"></i> Filter
                                </button>
                                <button class="btn outline-btn">
                                    Export
                                </button>
                            </div>
                        </div>

                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Contact</th>
                                        <th>Orders</th>
                                        <th>Total Spent</th>
                                        <th>Last Order</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="customers-table-body">
                                    <!-- Customers will be populated by JavaScript -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="{{asset('js/data.js')}}"></script>
    <script src="{{asset('js/customers.js')}}"></script>
</body>
</html>