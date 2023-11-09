/*
  This module defines a route for performing game searches using the RAWG API.
  It handles search queries, processes the search results, and renders a template with game data.
*/

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define your search route
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.query;

    // Check if the user is logged in and set a variable in the response data
    const loggedIn = req.session.loggedIn;

    // Process the search query and obtain game data
    const gameData = await processSearchQuery(searchQuery);

    // Render the game-search.handlebars template with the gameData and loggedIn status
    res.render('game-search', { gameData, loggedIn });

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

    // Map the game data to return an array of game names, images, and ratings
    const gameData = games.map((game) => ({
      name: game.name,
      id: game.id,
      background_image: game.background_image,
      rating: game.rating,
    }));

    return gameData;

  } catch (error) {
    console.error('Error fetching game data from RAWG API:', error);

    // Handle the error by returning an empty array or a meaningful error message
    return [];
  }
}

module.exports = router;
