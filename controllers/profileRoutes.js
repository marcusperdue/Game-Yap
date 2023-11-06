// Import necessary modules and middleware
const express = require('express');
const router = express.Router();
const { withAuth } = require('../utils/auth'); // Import the withAuth middleware to protect the route

// Define the "Profile" route
router.get('/profile', withAuth, (req, res) => {
  // You can access the logged-in user's data from req.session.user
  const user = req.session.user;
  res.render('profile', { user }); // Render the "profile" template with the user data
});

module.exports = router;
