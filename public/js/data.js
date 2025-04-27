// Sample data for the CRM system

// Orders data
const ordersData = [
    {
        id: "ORD-001",
        customer: {
            name: "Emma Wilson",
            email: "emma@example.com",
            avatar: "img/avatars/avatar1.jpg"
        },
        date: "2023-04-25",
        amount: "$125.00",
        status: "completed",
        paymentStatus: "paid",
        items: "Birthday Cake, 12 Cupcakes"
    },
    {
        id: "ORD-002",
        customer: {
            name: "Michael Brown",
            email: "michael@example.com",
            avatar: "img/avatars/avatar2.jpg"
        },
        date: "2023-04-26",
        amount: "$85.50",
        status: "pending",
        paymentStatus: "pending",
        items: "Sourdough Bread, Croissants (6)"
    },
    {
        id: "ORD-003",
        customer: {
            name: "Sophia Garcia",
            email: "sophia@example.com",
            avatar: "img/avatars/avatar3.jpg"
        },
        date: "2023-04-26",
        amount: "$210.00",
        status: "processing",
        paymentStatus: "paid",
        items: "Wedding Cake Tasting"
    },
    {
        id: "ORD-004",
        customer: {
            name: "James Johnson",
            email: "james@example.com",
            avatar: "img/avatars/avatar4.jpg"
        },
        date: "2023-04-27",
        amount: "$45.75",
        status: "completed",
        paymentStatus: "paid",
        items: "Chocolate Chip Cookies (24)"
    },
    {
        id: "ORD-005",
        customer: {
            name: "Olivia Martinez",
            email: "olivia@example.com",
            avatar: "img/avatars/avatar5.jpg"
        },
        date: "2023-04-27",
        amount: "$150.25",
        status: "pending",
        paymentStatus: "pending",
        items: "Custom Birthday Cake"
    }
];

// Customers data
const customersData = [
    {
        id: "CUST-001",
        name: "Emma Wilson",
        email: "emma@example.com",
        phone: "(555) 123-4567",
        orders: 12,
        totalSpent: "$1,245.00",
        lastOrder: "2023-04-25",
        status: "active",
        avatar: "img/avatars/avatar1.jpg"
    },
    {
        id: "CUST-002",
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "(555) 234-5678",
        orders: 8,
        totalSpent: "$875.50",
        lastOrder: "2023-04-20",
        status: "active",
        avatar: "img/avatars/avatar2.jpg"
    },
    {
        id: "CUST-003",
        name: "Sophia Garcia",
        email: "sophia@example.com",
        phone: "(555) 345-6789",
        orders: 15,
        totalSpent: "$2,310.75",
        lastOrder: "2023-04-26",
        status: "active",
        avatar: "img/avatars/avatar3.jpg"
    },
    {
        id: "CUST-004",
        name: "James Johnson",
        email: "james@example.com",
        phone: "(555) 456-7890",
        orders: 5,
        totalSpent: "$450.25",
        lastOrder: "2023-04-15",
        status: "inactive",
        avatar: "img/avatars/avatar4.jpg"
    },
    {
        id: "CUST-005",
        name: "Olivia Martinez",
        email: "olivia@example.com",
        phone: "(555) 567-8901",
        orders: 10,
        totalSpent: "$1,050.00",
        lastOrder: "2023-04-22",
        status: "active",
        avatar: "img/avatars/avatar5.jpg"
    }
];

// Products data
const productsData = [
    {
        id: "PROD-001",
        name: "Chocolate Cake",
        category: "Cakes",
        price: "$35.00",
        stock: 12,
        status: "active",
        image: "img/products/chocolate-cake.jpg"
    },
    {
        id: "PROD-002",
        name: "Vanilla Cupcakes",
        category: "Cupcakes",
        price: "$3.50",
        stock: 24,
        status: "active",
        image: "img/products/vanilla-cupcakes.jpg"
    },
    {
        id: "PROD-003",
        name: "Sourdough Bread",
        category: "Bread",
        price: "$6.25",
        stock: 8,
        status: "active",
        image: "img/products/sourdough-bread.jpg"
    },
    {
        id: "PROD-004",
        name: "Croissants",
        category: "Pastries",
        price: "$3.75",
        stock: 15,
        status: "active",
        image: "img/products/croissants.jpg"
    },
    {
        id: "PROD-005",
        name: "Chocolate Chip Cookies",
        category: "Cookies",
        price: "$2.25",
        stock: 36,
        status: "active",
        image: "img/products/chocolate-chip-cookies.jpg"
    },
    {
        id: "PROD-006",
        name: "Wedding Cake (3-tier)",
        category: "Cakes",
        price: "$350.00",
        stock: 0,
        status: "made-to-order",
        image: "img/products/wedding-cake.jpg"
    }
];

// Calendar events data
const calendarEvents = [
    {
        id: "ORD-006",
        title: "Wedding Cake",
        customer: "Sarah Johnson",
        date: "2023-04-28",
        time: "10:00 AM",
        type: "pickup",
        status: "confirmed"
    },
    {
        id: "ORD-007",
        title: "Birthday Cake",
        customer: "David Lee",
        date: "2023-04-28",
        time: "2:30 PM",
        type: "pickup",
        status: "confirmed"
    },
    {
        id: "ORD-008",
        title: "Assorted Pastries",
        customer: "Emily Chen",
        date: "2023-04-29",
        time: "9:00 AM",
        type: "delivery",
        status: "confirmed"
    },
    {
        id: "ORD-009",
        title: "Sourdough Bread (6)",
        customer: "Robert Wilson",
        date: "2023-04-29",
        time: "11:30 AM",
        type: "pickup",
        status: "confirmed"
    },
    {
        id: "ORD-010",
        title: "Anniversary Cake",
        customer: "Jennifer Lopez",
        date: "2023-04-30",
        time: "3:00 PM",
        type: "pickup",
        status: "pending"
    }
];

// Upcoming orders data
const upcomingOrders = [
    {
        id: "ORD-006",
        customer: "Sarah Johnson",
        date: "2023-04-28",
        time: "10:00 AM",
        items: "Wedding Cake",
        notes: "3-tier vanilla cake with buttercream frosting"
    },
    {
        id: "ORD-007",
        customer: "David Lee",
        date: "2023-04-28",
        time: "2:30 PM",
        items: "Birthday Cake",
        notes: "Chocolate cake with 'Happy 30th Birthday' message"
    },
    {
        id: "ORD-008",
        customer: "Emily Chen",
        date: "2023-04-29",
        time: "9:00 AM",
        items: "Assorted Pastries",
        notes: "Catering order for office meeting"
    },
    {
        id: "ORD-009",
        customer: "Robert Wilson",
        date: "2023-04-29",
        time: "11:30 AM",
        items: "Sourdough Bread (6)",
        notes: "Weekly subscription order"
    }
];

// Sales data for charts
const salesData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1900 },
    { day: "Wed", sales: 1500 },
    { day: "Thu", sales: 2200 },
    { day: "Fri", sales: 2800 },
    { day: "Sat", sales: 3500 },
    { day: "Sun", sales: 2100 }
];

// Product distribution data for charts
const productDistribution = [
    { category: "Cakes", value: 35 },
    { category: "Pastries", value: 25 },
    { category: "Bread", value: 20 },
    { category: "Cookies", value: 15 },
    { category: "Other", value: 5 }
];

// Status badge colors
const statusColors = {
    completed: "badge-success",
    pending: "badge-warning",
    processing: "badge-info",
    cancelled: "badge-danger",
    active: "badge-success",
    inactive: "badge-secondary",
    "out-of-stock": "badge-danger",
    "made-to-order": "badge-info",
    confirmed: "badge-success",
    pickup: "badge-info",
    delivery: "badge-secondary",
    paid: "badge-success"
};