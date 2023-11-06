const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    // If not logged in, you can handle it here, such as redirecting to the login page.
    res.redirect('/login'); // Adjust the route path as needed
  } else {
    // If logged in, attach user information to the request object.
    req.currentUser = {
      userId: req.session.userId,
      username: req.session.username,
    };
    next();
  }
};

module.exports = withAuth;