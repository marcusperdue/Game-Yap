/*
  This module defines the main router for organizing and routing different parts of the application.
  It includes routes for home, games, search, registration, login, logout, and user profiles.
*/

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./gameRoutes');
const searchRoutes = require('./searchRoutes');
const registrationRoutes =require('./registrationRoutes');
const loginRoutes =require('./loginRoutes');
const logoutRoutes =require('./logoutRoutes');
const profileRoutes = require('./profileRoutes');
 
 
router.use('/', homeRoutes);
router.use('/games', gameRoutes);
router.use('/search',searchRoutes);
router.use('/register',registrationRoutes);
router.use('/login',loginRoutes);
router.use('/logout',logoutRoutes);
router.use('/profile', profileRoutes);
 

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
