document.addEventListener("DOMContentLoaded", () => {



  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude; 
        const lng = position.coords.longitude; 
        console.log(lat, lng);

        getWeather(lat, lng);

        
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


        setInterval(() => {
          getWeather(lat, lng);
        }, 1*m);

      },
      function (error) {
        console.error("Error getting user location:", error);
      },
      {
        enableHighAccuracy: true, 
        timeout: 5000             
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }


  async function getWeather(lat, lng) {
    const apiUrl = `.netlify/functions/weather?lat=${lat}&lon=${lng}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      const temperature = data.current.temp_c;
      const conditionText = data.current.condition.text;
      let conditionIcon = data.current.condition.icon;
      let location = data.location.name;
      const loc_emoji = '📍';
  
      conditionIcon = conditionIcon.replace("//", "https://");
      const windSpeed = data.current.wind_kph;
  
      // Adding a delay before showing the weather data
      setTimeout(() => {
        let block = document.getElementById("block");
        block.classList.remove('hidden');
        block.style.display = 'block';
        block.classList.add('slide-down');
  
        document.getElementById("temperature").innerHTML = `${temperature}°C`;
        document.getElementById("condition").textContent = conditionText;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} kph`;
  
        let div = document.getElementById('image');
        let loc_image = document.getElementById('location');
        loc_image.innerHTML = `<p class="text-gray-800 dark:text-gray-200"><b>${loc_emoji} ${location}</b></p>`;
  
        div.innerHTML = `<img id="weather-icon" src='${conditionIcon}' class="w-20 h-20">`;
      }, 1500);
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  


  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )


  localStorage.theme = 'light'


  localStorage.theme = 'dark'


  localStorage.removeItem('theme')

});