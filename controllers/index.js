const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./gameRoutes');
const searchRoutes = require('./searchRoutes');
const registrationRoutes =require('./registrationRoutes');
const loginRoutes =require('./loginRoutes');
const logoutRoutes =require('./logoutRoutes');
 
 

router.use('/', homeRoutes);
router.use('/games', gameRoutes);
router.use('/search',searchRoutes);
router.use('/register',registrationRoutes);
router.use('/login',loginRoutes);
router.use('/logout',logoutRoutes);
 

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
