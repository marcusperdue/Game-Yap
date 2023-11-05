const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Import your User model

router.post('/', async (req, res) => {
  try {
    // Extract user login data from req.body
    const { username, password } = req.body;
    console.log('Received login request with username:', username);

    // Check for empty username or password
    if (!username || !password) {
      console.log('Authentication failed: Username or password not provided');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Authenticate the user (check if the provided credentials match a user in your database)
    const user = await User.findOne({ where: { username } });
    console.log('Found user:', user);

    if (!user) {
      console.log('Authentication failed: User not found');
      return res.status(401).json({ error: 'Authentication failed: User not found' });
    }

    // Retrieve the hashed password from the user record
    const hashedPasswordFromDB = user.password;

    // Compare the hashed password from the DB with the input password
 const passwordMatch = await bcrypt.compare(password.trim(), hashedPasswordFromDB);

    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Authentication failed: Password does not match');
      return res.status(401).json({ error: 'Authentication failed: Password does not match' });
    }
    
    // If authentication is successful, create a user session
    req.session.logged_in = true;
    req.session.user_id = user.id;
    
   
    // Redirect the user to the desired page or send a success response
    // For a REST API, you might just want to send a JSON response
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    // Handle login errors
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed due to an unexpected error' });
  }
});

module.exports = router;
