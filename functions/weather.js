const axios = require('axios');
require('dotenv').config();

exports.handler = async (event) => {
    const { lat, lon } = event.queryStringParameters; 

    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
    };

    if (!lat || !lon) {
        return {
            statusCode: 400,
            headers: headers, // Include headers in the response
            body: JSON.stringify({ error: 'Latitude and longitude are required' }),
        };
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            headers: headers, // Include headers in the response
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return {
            statusCode: 500,
            headers: headers, // Include headers in the response
            body: JSON.stringify({ error: 'Error fetching weather data' }),
        };
    }
};
