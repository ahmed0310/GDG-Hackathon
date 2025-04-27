<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice Notes - Sweet Success Bakery CRM</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/voice-notes.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .checkbox-wrapper input[type="checkbox"] {
        width: auto;
      }
    </style>
</head>
<body>
    <div class="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="img/logo.png" alt="Sweet Success Bakery" class="logo">
                <h2>Sweet Success</h2>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="{{ route('Admin') }}"><i class="fas fa-home"></i> Dashboard</a></li>
                    <li><a href="{{ route('Customers') }}"><i class="fas fa-users"></i> Customers</a></li>
                    <li><a href="{{ route('Orders') }}"><i class="fas fa-shopping-cart"></i> Orders</a></li>
                    <li><a href="{{ route('Products') }}"><i class="fas fa-birthday-cake"></i> Products</a></li>
                    <li class="active"><a href="{{ route('Voice') }}"><i class="fas fa-microphone"></i> Voice Notes</a></li>
                    <li><a href="{{ route('Calendar') }}"><i class="fas fa-calendar-alt"></i> Calendar</a></li>
                    <li><a href="{{ route('Settings') }}"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Header -->
            <header class="header">
                <div class="header-left">
                    <button class="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1>Voice Notes</h1>
                </div>
                <div class="header-right">
                    <div class="search-bar">
                        <input type="text" placeholder="Search...">
                        <button><i class="fas fa-search"></i></button>
                    </div>
                    <div class="user-profile">
                        <img src="img/admin-avatar.jpg" alt="Admin">
                        <span>Admin</span>
                    </div>
                </div>
            </header>

            <!-- Content -->
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="title-section">
                        <h2><i class="fas fa-microphone"></i> All Voice Notes</h2>
                        <p>Manage and listen to all customer voice notes</p>
                    </div>
                    <div class="actions">
                        <button class="btn btn-outline filter-by-customer-btn">
                            <i class="fas fa-users"></i> Filter by Customer
                        </button>
                        <button class="btn btn-outline bulk-download-btn">
                            <i class="fas fa-download"></i> Bulk Download
                        </button>
                        <button class="btn btn-primary record-new-btn">
                            <i class="fas fa-microphone"></i> Record New
                        </button>
                    </div>
                </div>

                <!-- Voice Notes Filters -->
                <div class="card filter-card">
                    <div class="card-body">
                        <div class="voice-notes-filters">
                            <div class="filter-group">
                                <label for="date-filter">Date Range:</label>
                                <select id="date-filter" class="form-select">
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label for="order-filter">Order Status:</label>
                                <select id="order-filter" class="form-select">
                                    <option value="all">All Orders</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div class="search-filter">
                                <input type="text" placeholder="Search voice notes..." class="search-input form-control">
                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Voice Notes List -->
                <div class="voice-notes-container">
                    <!-- Voice notes will be rendered here by JavaScript -->
                </div>

                <!-- Pagination -->
                <div class="pagination">
                    <button class="pagination-btn" disabled><i class="fas fa-chevron-left"></i></button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                    <button class="pagination-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </main>
    </div>

    <!-- Customer Filter Dialog -->
    <div class="dialog-overlay" id="customerFilterDialog">
        <div class="dialog customer-filter-dialog">
            <div class="dialog-header">
                <h3><i class="fas fa-users"></i> Filter by Customer</h3>
                <button class="close-dialog-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="dialog-content">
                <div class="customer-search">
                    <input type="text" placeholder="Search customers..." class="form-control">
                </div>
                <div class="customers-list">
                    <div class="customer-item">
                        <div class="customer-info">
                            <img src="img/customer-avatar.jpg" alt="Sarah Johnson" class="customer-avatar">
                            <div class="customer-details">
                                <h4>Sarah Johnson</h4>
                                <p>2 voice notes</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline view-notes-btn" data-customer-id="1">View Notes</button>
                    </div>
                    <div class="customer-item">
                        <div class="customer-info">
                            <img src="img/customer-avatar.jpg" alt="Michael Brown" class="customer-avatar">
                            <div class="customer-details">
                                <h4>Michael Brown</h4>
                                <p>1 voice note</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline view-notes-btn" data-customer-id="2">View Notes</button>
                    </div>
                    <div class="customer-item">
                        <div class="customer-info">
                            <img src="img/customer-avatar.jpg" alt="Emily Davis" class="customer-avatar">
                            <div class="customer-details">
                                <h4>Emily Davis</h4>
                                <p>1 voice note</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline view-notes-btn" data-customer-id="3">View Notes</button>
                    </div>
                    <div class="customer-item">
                        <div class="customer-info">
                            <img src="img/customer-avatar.jpg" alt="David Wilson" class="customer-avatar">
                            <div class="customer-details">
                                <h4>David Wilson</h4>
                                <p>0 voice notes</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline view-notes-btn" disabled>No Notes</button>
                    </div>
                    <div class="customer-item">
                        <div class="customer-info">
                            <img src="img/customer-avatar.jpg" alt="Jennifer Lee" class="customer-avatar">
                            <div class="customer-details">
                                <h4>Jennifer Lee</h4>
                                <p>0 voice notes</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline view-notes-btn" disabled>No Notes</button>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="btn btn-outline close-dialog-btn">Cancel</button>
                <button class="btn btn-primary clear-filter-btn">Clear Filter</button>
            </div>
        </div>
    </div>

    <!-- Record New Voice Note Dialog -->
    <div class="dialog-overlay" id="recordDialog">
        <div class="dialog record-dialog">
            <div class="dialog-header">
                <h3><i class="fas fa-microphone"></i> Record New Voice Note</h3>
                <button class="close-dialog-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="dialog-content">
                <div class="record-form">
                    <div class="form-group">
                        <label for="customer-select">Customer:</label>
                        <select id="customer-select" class="form-select">
                            <option value="">Select a customer</option>
                            <option value="1">Sarah Johnson</option>
                            <option value="2">Michael Brown</option>
                            <option value="3">Emily Davis</option>
                            <option value="4">David Wilson</option>
                            <option value="5">Jennifer Lee</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="order-select">Related Order (Optional):</label>
                        <select id="order-select" class="form-select" disabled>
                            <option value="">Select an order</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="note-title">Note Title:</label>
                        <input type="text" id="note-title" class="form-control" placeholder="Enter a title for this note">
                    </div>
                    <div class="form-group">
                        <label>Tags:</label>
                        <div class="tags-input">
                            <div class="tags-container">
                                <!-- Tags will be added here -->
                            </div>
                            <input type="text" class="tag-input" placeholder="Add a tag...">
                        </div>
                    </div>
                    <div class="form-group">
                      <div class="checkbox-wrapper">
                        <input type="checkbox" id="download-to-local" checked>
                        <label for="download-to-local">Download to local machine after saving</label>
                      </div>
                    </div>
                </div>

                <div class="voice-recorder">
                    <div class="recorder-idle">
                        <button class="btn btn-primary start-recording-btn">
                            <i class="fas fa-microphone"></i> Start Recording
                        </button>
                    </div>
                    
                    <div class="recorder-active" style="display: none;">
                        <div class="recording-indicator">
                            <div class="recording-pulse"></div>
                            <span class="recording-time">00:00</span>
                        </div>
                        <div class="recording-controls">
                            <button class="btn btn-outline cancel-recording-btn">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                            <button class="btn btn-primary stop-recording-btn">
                                <i class="fas fa-stop"></i> Stop
                            </button>
                        </div>
                    </div>
                    
                    <div class="recorder-preview" style="display: none;">
                        <div class="preview-audio">
                            <button class="preview-play-btn"><i class="fas fa-play"></i></button>
                            <div class="preview-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                                <span class="progress-time">0:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="btn btn-outline close-dialog-btn">Cancel</button>
                <button class="btn btn-primary save-note-btn">Save Note</button>
            </div>
        </div>
    </div>

    <!-- Add this new dialog for bulk download options -->
    <div class="dialog-overlay" id="bulkDownloadDialog">
      <div class="dialog bulk-download-dialog">
        <div class="dialog-header">
          <h3><i class="fas fa-download"></i> Bulk Download Voice Notes</h3>
          <button class="close-dialog-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="dialog-content">
          <div class="download-options">
            <div class="form-group">
              <label>Download Options:</label>
              <div class="radio-group">
                <div class="radio-option">
                  <input type="radio" id="download-all" name="download-option" value="all" checked>
                  <label for="download-all">All Voice Notes</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="download-filtered" name="download-option" value="filtered">
                  <label for="download-filtered">Currently Filtered Notes</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="download-customer" name="download-option" value="customer">
                  <label for="download-customer">By Customer</label>
                </div>
                <div class="radio-option">
                  <input type="radio" id="download-date" name="download-option" value="date">
                  <label for="download-date">By Date Range</label>
                </div>
              </div>
            </div>
            
            <div class="form-group customer-select-group" style="display: none;">
              <label for="bulk-customer-select">Select Customer:</label>
              <select id="bulk-customer-select" class="form-select">
                <option value="">Select a customer</option>
                <option value="1">Sarah Johnson</option>
                <option value="2">Michael Brown</option>
                <option value="3">Emily Davis</option>
                <option value="4">David Wilson</option>
                <option value="5">Jennifer Lee</option>
              </select>
            </div>
            
            <div class="form-group date-range-group" style="display: none;">
              <label>Date Range:</label>
              <div class="date-inputs">
                <div class="date-input-group">
                  <label for="start-date">Start Date:</label>
                  <input type="date" id="start-date" class="form-control">
                </div>
                <div class="date-input-group">
                  <label for="end-date">End Date:</label>
                  <input type="date" id="end-date" class="form-control">
                </div>
              </div>
            </div>
            
            <div class="download-warning">
              <i class="fas fa-exclamation-triangle"></i>
              <p>Downloading multiple voice notes at once may trigger browser download warnings. Please allow multiple downloads if prompted.</p>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-outline close-dialog-btn">Cancel</button>
          <button class="btn btn-primary start-download-btn">Download</button>
        </div>
      </div>
    </div>

    {{-- <script src="{{ asset('js/script.js') }}"></script> --}}
    <script src="{{ asset('js/voice-notes-storage.js') }}"></script>
    <script src="{{ asset('js/voice-notes-page.js') }}"></script>
    <!-- Add this script tag to include the bulk download functionality -->
    <script src="{{ asset('js/bulk-download.js') }}"></script>
</body>
</html>
