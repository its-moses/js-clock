

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
        const response = await fetch(url); // Use fetch instead of axios

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        return {
            statusCode: 200,
            headers: headers, // Include headers in the response
            body: JSON.stringify(data), // Send back the weather data
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
