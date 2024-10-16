document.addEventListener("DOMContentLoaded", () => {
    

s = 1000
m = 60*s
h = 60*m
const weatherButton = document.getElementById('weather-button');
const weatherContent = document.getElementById('weather-content');
weatherButton.addEventListener('click', () => {
    if (!weatherContent.classList.contains('visible')) {
        weatherContent.classList.add('visible'); 
        weatherContent.classList.remove('opacity-0'); 
        weatherContent.classList.add('opacity-100'); 
    } else {
        weatherContent.classList.remove('opacity-100'); 
        weatherContent.classList.add('opacity-0');
        setTimeout(() => {
            weatherContent.classList.remove('visible'); 
        }, 500); 
    }
});



setInterval(() => {
    let d = new Date()
    hour_val = d.getHours()
    min_val = d.getMinutes()
    sec_val = d.getSeconds()
    zone = d.getHours() > 12 ? 'PM' : 'AM';

    current_date = document.getElementById('current-date')
    current_date.innerHTML = `${d.toDateString()}`
    value = document.getElementById('digital-clock')
    value.innerHTML = `${hour_val.toString().padStart(2, '0')}:${min_val.toString().padStart(2, '0')}:${sec_val.toString().padStart(2, '0')} ${zone}`
}, s);

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙'; // Change icon based on theme
});


document.getElementById("weather-button").addEventListener("click", function() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude; // Get latitude
          const lng = position.coords.longitude; // Get longitude
  
          // Pass the lat and lng to the server's weather API endpoint
          getWeather(lat, lng);
        },
        function(error) {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true, // For better precision if outdoors
          timeout: 5000             // Max time to wait for location fix
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });
  
  function getWeather(lat, lng) {
    const apiUrl = `/weather?lat=${lat}&lon=${lng}`; // Call the server endpoint with query parameters
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle errors in the response
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        // Extract relevant data from the API response
        const temperature = data.temp_c; // Assuming your API returns temperature in temp_c
        const conditionText = data.condition.text; // Assuming the weather condition is in this structure
        const conditionIcon = data.condition.icon; // URL for the weather icon
        const windSpeed = data.wind_kph; // Wind speed

        // Update the weather data in the HTML
        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("condition").textContent = conditionText;
        document.getElementById("weather-icon").src = conditionIcon;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} kph`;

        // Show the weather content
        document.getElementById("weather-icon").classList.remove("hidden");
        document.getElementById("weather-content").classList.remove("opacity-0");
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
}
  


});