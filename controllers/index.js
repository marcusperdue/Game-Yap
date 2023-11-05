const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const gameRoutes = require('./gameRoutes');
const searchRoutes = require('./searchRoutes')
const registrationRoutes =require('./registrationRoutes')
const loginRoutes =require('./loginRoutes')
const logoutRoutes =require('./logoutRoutes')

router.use('/', homeRoutes);
router.use('/games', gameRoutes);
router.use('/search',searchRoutes)
router.use('/register',registrationRoutes)
router.use('/login',loginRoutes)
router.use('/logout',logoutRoutes)

module.exports = router;
