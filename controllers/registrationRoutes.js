/*
  This module defines a route for user registration.
  It checks for required fields, username availability, and handles registration errors.
*/

const router = require('express').Router();
const { User } = require('../models/');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for required fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).render('signup', { error: 'Username is already taken' });
    }

    // Create user (no need to hash password here, the model's beforeCreate hook will do it)
    const newUser = await User.create({
      username,
      password, // Passed directly to User.create; will be hashed in the beforeCreate hook
    });

    // Redirect or render upon successful registration
    res.status(201).render('registration-complete', { user: newUser });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const validationErrors = error.errors.map(e => e.message);
      res.status(400).json({ error: validationErrors });
    } else {
      // Generic error message
      res.status(500).json({ error: 'Registration failed due to unexpected error' });
    }
  }
});

module.exports = router;
