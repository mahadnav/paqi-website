const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, images) from the current directory
app.use(express.static(__dirname));

// Define the proxy endpoint
app.get('/api/aqi', async (req, res) => {
  try {
    const { lat, lon } = req.query; // Get lat/lon from frontend request

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const apiKey = process.env.IQAIR_API_KEY;
    const apiUrl = `https://api.airvisual.com/v2/nearest_station?lat=${lat}&lon=${lon}&key=${apiKey}`;

    // Make the request to the real API
    const response = await axios.get(apiUrl);

    // Send the response from the API back to the frontend
    res.json(response.data);

  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ message: 'Failed to fetch AQI data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});