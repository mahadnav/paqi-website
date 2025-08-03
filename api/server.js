const axios = require('axios');
require('dotenv').config(); // For local development

export default async function handler(request, response) {
  try {
    const { lat, lon } = request.query;

    if (!lat || !lon) {
      return response.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const apiKey = process.env.IQAIR_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not configured on the server.');
    }

    const apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`;

    const apiResponse = await axios.get(apiUrl);
    
    // Send the successful response from IQAir back to the frontend
    response.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('API Route Error:', error.message);
    response.status(500).json({ message: 'Failed to fetch AQI data' });
  }
}