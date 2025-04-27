document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    let currentDate = new Date();
    renderCalendar(currentDate);
    
    // Update month display
    updateMonthDisplay(currentDate);
    
    // Previous month button
    document.getElementById('prev-month').addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        renderCalendar(currentDate);
        updateMonthDisplay(currentDate);
    });
    
    // Next month button
    document.getElementById('next-month').addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        renderCalendar(currentDate);
        updateMonthDisplay(currentDate);
    });
});

// Render calendar
function renderCalendar(date) {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Create cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        // Check if this is today
        const currentDate = new Date();
        if (currentDate.getDate() === day && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            dayCell.classList.add('today');
        }
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // Add events for this day
        const dayEvents = getEventsForDay(year, month, day);
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';
            
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'calendar-event';
                
                eventElement.innerHTML = `
                    <div class="event-title">
                        <i class="fas fa-birthday-cake"></i>
                        ${event.title}
                    </div>
                    <div class="event-time">${event.time}</div>
                    <div class="event-badges">
                        <span class="badge ${statusColors[event.type]}">${event.type}</span>
                        <span class="badge ${statusColors[event.status]}">${event.status}</span>
                    </div>
                `;
                
                eventsContainer.appendChild(eventElement);
            });
            
            dayCell.appendChild(eventsContainer);
        }
        
        calendarDays.appendChild(dayCell);
    }
}

// Get events for a specific day
function getEventsForDay(year, month, day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateStr);
}

// Update month display
function updateMonthDisplay(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('current-month').textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}