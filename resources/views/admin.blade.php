<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Success CRM | Dashboard</title>
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <link rel="stylesheet" href="{{asset('css/dashboard.css')}}">
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
                    <li class="active"><a href="{{ route('Admin') }}"><i class="fas fa-home"></i> Dashboard</a></li>
                    <li><a href="{{ route(Customers) }}"><i class="fas fa-users"></i> Customers</a></li>
                    <li><a href="{{ route('Orders') }}"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                    <li><a href="{{ route('Products') }}"><i class="fas fa-birthday-cake"></i> Products</a></li>
                    <li ><a href="{{ route('Voice') }}"><i class="fas fa-microphone"></i> Voice Notes</a></li>
                    <li><a href="{{ route('Settings') }}"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <header>
                <div class="page-title">
                    <h1>Dashboard</h1>
                </div>
                <div class="header-actions">
                    <div class="date-display">
                        <i class="fas fa-calendar"></i>
                        <span id="current-date">April 27, 2023</span>
                    </div>
                    <div class="user-menu">
                        <img src="img/user-avatar.jpg" alt="User" class="avatar">
                        <span>John Baker</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </header>

            <!-- Dashboard Content -->
            <div class="dashboard">
                <!-- Stats Cards -->
                <div class="stats-container">
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="stat-title">Total Sales</p>
                            <h3 class="stat-value">$12,426</h3>
                            <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 12.5% from last month</p>
                        </div>
                        <div class="stat-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="stat-title">Total Orders</p>
                            <h3 class="stat-value">384</h3>
                            <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 8.2% from last month</p>
                        </div>
                        <div class="stat-icon">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="stat-title">Customers</p>
                            <h3 class="stat-value">152</h3>
                            <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 5.3% from last month</p>
                        </div>
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="stat-title">Products</p>
                            <h3 class="stat-value">48</h3>
                            <p class="stat-change positive"><i class="fas fa-arrow-up"></i> 2 new this month</p>
                        </div>
                        <div class="stat-icon">
                            <i class="fas fa-cookie"></i>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="charts-container">
                    <div class="chart-card">
                        <div class="card-header">
                            <h2>Weekly Sales</h2>
                            <p>Overview of sales for the current week</p>
                        </div>
                        <div class="card-body">
                            <canvas id="sales-chart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="card-header">
                            <h2>Product Distribution</h2>
                            <p>Sales by product category</p>
                        </div>
                        <div class="card-body">
                            <canvas id="product-chart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Recent Orders Table -->
                <div class="recent-orders">
                    <div class="card">
                        <div class="card-header">
                            <h2>Recent Orders</h2>
                            <div class="tab-controls">
                                <button class="tab-btn active" data-tab="recent">Recent</button>
                                <button class="tab-btn" data-tab="pending">Pending</button>
                                <button class="tab-btn" data-tab="completed">Completed</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="orders-table-body">
                                    <!-- Orders will be populated by JavaScript -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Orders -->
                <div class="upcoming-orders">
                    <div class="card">
                        <div class="card-header">
                            <h2><i class="fas fa-calendar-alt"></i> Upcoming Orders</h2>
                        </div>
                        <div class="card-body">
                            <div class="upcoming-list" id="upcoming-orders-list">
                                <!-- Upcoming orders will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{asset('js/data.js')}}"></script>
    <script src="{{asset('js/dashboard.js')}}"></script>
</body>
</html>