<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Success CRM | Calendar</title>
    <link rel="stylesheet" href="{{asset('css/styles.css')}}">
    <link rel="stylesheet" href="{{asset('css/calendar.css')}}">
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
                    <li><a href="{{ route('Products') }}"><i class="fas fa-cookie"></i> Products</a></li>
                    <li ><a href="{{ route('Voice') }}"><i class="fas fa-microphone"></i> Voice Notes</a></li>
                    <li class="active"><a href="{{ route('Calendar') }}"><i class="fas fa-calendar-alt"></i> Calendar</a></li>
                    <li><a href="{{ route('Settings') }}"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="content">
            <header>
                <div class="page-title">
                    <h1>Calendar</h1>
                </div>
                <div class="header-actions">
                    <button class="btn primary-btn">
                        <i class="fas fa-plus"></i> New Event
                    </button>
                </div>
            </header>

            <!-- Calendar Content -->
            <div class="calendar-container">
                <div class="card">
                    <div class="card-header">
                        <div class="calendar-header">
                            <div>
                                <h2>Order Calendar</h2>
                                <p>Schedule of upcoming orders and deliveries</p>
                            </div>
                            <div class="calendar-navigation">
                                <button id="prev-month" class="btn icon-btn">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <h3 id="current-month">April 2023</h3>
                                <button id="next-month" class="btn icon-btn">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="calendar">
                            <div class="calendar-weekdays">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>
                            <div class="calendar-days" id="calendar-days">
                                <!-- Calendar days will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="{{asset('js/data.js')}}"></script>
    <script src="{{asset('js/calendar.js')}}"></script>
</body>
</html>