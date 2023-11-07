// Import necessary modules and middleware
const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth')

// Define routes related to the user profile
router.get('/', withAuth, (req, res) => {
  // Access the logged-in user's data from req.session.user
  console.log('hello');

  const user = req.session.user;
  
  // Render the "profile" template with the user data
  res.render('profile', { user });
  console.log(user);
});

module.exports = router;
