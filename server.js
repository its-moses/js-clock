// server.js

const express = require('express'); // Import Express framework
const getWeather = require('./functions/weather'); // Import the weather function
const cors = require('cors'); // Import CORS for cross-origin requests

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port to listen on

// Middleware
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Middleware to parse JSON request bodies

// Define a route for fetching weather data
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query; // Extract latitude and longitude from the query string

    // Check if lat and lon are provided
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const weatherData = await getWeather(lat, lon); // Call the weather function
        res.json(weatherData); // Send the weather data as a JSON response
    } catch (error) {
        console.error(error); // Log any errors to the console
        res.status(500).json({ error: 'Error fetching weather data' }); // Respond with a 500 error
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message when the server starts
});
