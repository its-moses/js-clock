document.addEventListener("DOMContentLoaded", () => {




  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude; // Get latitude
        const lng = position.coords.longitude; // Get longitude
        console.log(lat, lng);

        s = 1000
        m = 60 * s
        h = 60 * m
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

        getWeather(lat, lng);

        setInterval(() => {
          getWeather(lat, lng);
        }, h);

      },
      function (error) {
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

  //   document.getElementById("weather-button").addEventListener("click", function () {
  // });

  function getWeather(lat, lng) {
    const apiUrl = `http://localhost:3000/weather?lat=${lat}&lon=${lng}`; // Call the server endpoint with query parameters

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {

        const temperature = data.current.temp_c;
        const conditionText = data.current.condition.text;
        let conditionIcon = data.current.condition.icon;
        let location = data.location.name;
        loc_emoji = '📍';

        conditionIcon = conditionIcon.replace("//", "https://");
        const windSpeed = data.current.wind_kph;

        document.getElementById("temperature").innerHTML = `${temperature}°C`;
        document.getElementById("condition").textContent = conditionText;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} kph`;

        let div = document.getElementById('image');
        let loc_image = document.getElementById('location')
        loc_image.innerHTML = `<p><b>${loc_emoji} ${location}</b></p>`;

        div.innerHTML = `<img id="weather-icon" src='${conditionIcon}' class="w-20 h-20">`;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }

  const themeToggle = document.getElementById('theme-toggle');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙'; // Change icon based on theme
  });


});