const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define your search route
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.query;

    // Process the search query and obtain game names
    const gameNames = await processSearchQuery(searchQuery);

    // Render the game-search.handlebars template with the gameNames data
    res.render('game-search', { gameNames });
  } catch (error) {
    console.error('Error performing search:', error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the processSearchQuery function
async function processSearchQuery(query) {
  try {
    // Make an HTTP GET request to your server's search endpoint
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(query)}`);

    // Extract the game data from the response
    const games = response.data.results;

    // Map the game data to return an array of game names
    const gameNames = games.map((game) => game.name);

    return gameNames;
  } catch (error) {
    console.error('Error fetching game data from RAWG API:', error);

    // Handle the error by returning an empty array or a meaningful error message
    return [];
  }
}

module.exports = router;
