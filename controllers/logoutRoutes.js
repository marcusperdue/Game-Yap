const express = require('express');
const router = express.Router();

// Handle logout using a GET request
router.get('/', (req, res) => {
  // Clear the session data (e.g., userId, username)
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.redirect('/'); // Redirect to the home page after logout
    }
  });
});

module.exports = router;
