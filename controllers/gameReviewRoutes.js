const express = require('express');
const axios = require('axios');
const router = express.Router();
const Comment = require('../models/Comment'); 
const withAuth = require('../utils/auth')

router.get('/:gameId', async (req, res) => {
 try {
    const gameId = req.params.gameId;
    const loggedIn = req.session.loggedIn;

    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: {
        key: process.env.RAWG_API_KEY,
      },
    });

    const gameData = response.data;

    if (!gameData || gameData.error) {
      console.error('Error fetching game details from RAWG API:', gameData.error || 'Unknown error');
      return res.status(404).render('error', { message: 'Game not found' });
    }

    const gameTitle = gameData.name;
    const gameSummary = gameData.description;
    const gameImage = gameData.background_image;

    res.render('game-review', {
      gameTitle,
      gameSummary,
      gameImage,
      gameId,
      textClass: 'text-sm',
      loggedIn,
    });
 } catch (error) {
    console.error('Network error while fetching game details from RAWG API:', error);
    res.status(500).render('error', { message: 'Internal server error' });
 }
});

router.post('/:gameId/post-comment', withAuth, async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const { commentText } = req.body;

    // Check if the user is authenticated (withAuth middleware)
    if (!req.session.loggedIn) {
      return res.status(401).json({ error: 'Unauthorized. Please sign in to comment.' });
    }

    // Create a new comment in your database
    const newComment = await Comment.create({
      comment_text: commentText, // Change 'text' to 'comment_text' to match the Sequelize model
      gameId: gameId, // Associate the comment with the game
      userId: req.session.userId, // Associate with the user who posted the comment
    });

    // Redirect back to the game review page after posting the comment
    res.redirect(`/game-review/${gameId}`);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
module.exports = router;