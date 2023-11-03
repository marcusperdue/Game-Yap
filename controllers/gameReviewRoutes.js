const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define a route to render the game review page
router.get('/:gameId', async (req, res) => {
  try {
    const gameId = req.params.gameId;
    
    // Make a GET request to the RAWG API to fetch game details
    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: {
        key: process.env.RAWG_API_KEY, // Replace with your API key
        // Add any other query parameters you need
      },
    });

    const gameData = response.data;

    // Check if the game data was retrieved successfully
    if (!gameData || gameData.error) {
      // Handle the case where the game data is not found or there's an error
      console.error('Error fetching game details from RAWG API:', gameData.error || 'Unknown error');
      return res.status(404).render('error', { message: 'Game not found' });
    }

    // Extract the relevant game details (title, summary, etc.) from gameData
    const gameTitle = gameData.name;
    const gameSummary = gameData.description;
    const gameImage = gameData.background_image; // Extract the game image URL

    // Render the "game-review.handlebars" template with game data
    res.render('game-review', { gameTitle, gameSummary, gameImage }); // Pass the game image to the template
  } catch (error) {
    console.error('Network error while fetching game details from RAWG API:', error);
    res.status(500).render('error', { message: 'Internal server error' });
  }
});

module.exports = router;
