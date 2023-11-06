// Import required modules
const express = require('express');
const router = express.Router();

// Define a route to handle comment submission
router.post('/:gameId/post-comment', async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.loggedIn) {
      // If not logged in, redirect to a login page or show an error message
      return res.status(401).send('Unauthorized. Please sign in to comment.');
    }

    // Extract the comment text from the request body
    const { commentText } = req.body;

    // Validate the comment text (you can add more validation here)

    // Save the comment to your database (assuming you have a database)
    // Replace this with your actual database logic
    // For example:
    // const comment = new Comment({
    //   text: commentText,
    //   user: req.session.userId, // Assuming you have a userId in your session
    //   // Other comment properties like gameId, timestamp, etc.
    // });
    // await comment.save();

    // Redirect back to the game review page or handle success accordingly
    res.redirect(`/game-review/${req.params.gameId}`); // Redirect to the appropriate game review page

  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
