// Inside loginRoutes.js or wherever you handle login logic
const express = require('express');
const router = express.Router();
const { User } = require('../models/'); // Adjust the path according to your project structure
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      // User not found
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare submitted password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Passwords do not match
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // If password matches, set up the session
    
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    req.session.user = {
      id: user.id,
      username: user.username,
    };

    console.log('Session data after login:', req.session);
    req.session.save(() => {
      console.log('User authenticated and session saved.');
      res.redirect('/'); // Redirect to home page
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
