const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const routes = require('./controllers');
const sequelize = require('./config/connection');
const gameroutes = require('./controllers/gameRoutes');
const searchRoutes = require('./controllers/searchRoutes');  
const gameReviewRoutes = require('./controllers/gameReviewRoutes');
const registrationRoutes = require('./controllers/registrationRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const logoutRoutes = require('./controllers/logoutRoutes');
const profileRoutes = require('./controllers/profileRoutes');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  helpers: {
    gt: function (value, comparison) {
      return value > comparison;
    },
  },
});

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10,  
    expiration: 1000 * 60 * 30 
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/gameRoutes', gameroutes);
app.use('/search', searchRoutes);
app.use('/game-review', gameReviewRoutes);
app.use('/register', registrationRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/profile', profileRoutes);
 
app.use('/', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});