// logoutRoutes.js
const router = require('express').Router();

router.get('/', (req, res) => {
  // Destroy the user session to log them out (using express-session)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Logout failed' });
    } else {
      // Redirect the user to the login or home page, or send a success response
      res.redirect('/login'); // You can change the redirect URL as needed
    }
  });
});

module.exports = router;
