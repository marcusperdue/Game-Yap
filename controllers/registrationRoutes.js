const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      password: hashedPassword,
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
