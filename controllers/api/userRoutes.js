const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      // Handle Sequelize validation errors
      res.status(400).json({ message: 'Validation error', errors: err.errors });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'An error occurred while creating the user', error: err });
    }
  }
});
