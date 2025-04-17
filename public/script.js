// Example: Fetch bot status from server or set default value
document.addEventListener("DOMContentLoaded", function () {
  const statusElement = document.getElementById("status");
  
  // Make an API request to fetch bot status or set it dynamically
  fetch('/discord/status')
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        statusElement.textContent = data.status;
      } else {
        statusElement.textContent = 'Offline';
      }
    })
    .catch(error => {
      console.error('Error fetching bot status:', error);
      statusElement.textContent = 'Offline';
    });
});
