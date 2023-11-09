/*
  This module defines a route to fetch data from the RAWG API and sends it to the client.
*/

const express = require('express');
const axios = require('axios');
const router = express.Router(); // Create a router

// Define a route to fetch data from the RAWG API
router.get('/games', async (req, res) => { // Update the route to '/games'
  try {
    // Make a GET request to the RAWG API
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
        // You can add more query parameters as needed
      },
    });

    // Send the RAWG API response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from RAWG API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
