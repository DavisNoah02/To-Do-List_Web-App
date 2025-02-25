

// Function to update current time and day
function updateDateTime() {
    const currentDate = new Date();
    // Local Time
    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const localTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    // UTC Time
    const utcTime = currentDate.toISOString().slice(11, 19); // Extracting HH:mm:ss from ISO string

    // Update DOM elements
    document.getElementById('current-time').textContent = `${day}, ${localTime}`;
    document.getElementById('current-time-utc').textContent = `UTC Time: ${utcTime}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();