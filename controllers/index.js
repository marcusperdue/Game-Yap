const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const gameRoutes = require('./gameRoutes');
const searchRoutes = require('./searchRoutes')
 

router.use('/', homeRoutes);
router.use('/games', gameRoutes);
router.use('/search',searchRoutes)
 

module.exports = router;
