const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Replace with your actual Comment model path

router.post('/:gameId/post-comment', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(401).send('Unauthorized. Please sign in to comment.');
    }

    const { commentText } = req.body;
    if (!commentText) {
      // handle validation error, such as empty comment
      return res.status(400).send('Comment text is required.');
    }

    // Replace with your actual database logic
    const comment = new Comment({
      text: commentText,
      user: req.session.userId,
      gameId: req.params.gameId,
      // Other comment properties like timestamp can be set by default in your model
    });
    await comment.save();

    res.redirect(`/game-review/${req.params.gameId}`);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
