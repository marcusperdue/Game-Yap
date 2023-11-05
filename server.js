const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config();
const routes = require('./controllers');
const gameroutes = require('./controllers/gameRoutes');
const searchRoutes = require('./controllers/searchRoutes');  
const gameReviewRoutes = require('./controllers/gameReviewRoutes');
const registrationRoutes = require('./controllers/registrationRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const logoutRoutes = require('./controllers/logoutRoutes');
const sequelize = require('./config/connection');
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
  }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));

app.use(cors());

app.use('/games', gameroutes);
app.use('/search', searchRoutes);
app.use('/game-review', gameReviewRoutes);
app.use('/register', registrationRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
 
app.use('/', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
