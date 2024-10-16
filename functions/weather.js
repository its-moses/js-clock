// functions/weather.js

const axios = require('axios'); // Import Axios for making HTTP requests
require('dotenv').config(); 
// Function to fetch weather data
const getWeather = async (lat, lon) => {
    const apiKey = process.env.WEATHER_API_KEY; // Get API key from environment variables
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // Construct the API URL
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    try {
        const response = await axios.get(url); // Make a GET request to the weather API
        return response.data; // Return the weather data received from the API
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log any errors
        throw error; // Rethrow the error for handling in server.js
    }
};

module.exports = getWeather; // Export the function for use in server.js
