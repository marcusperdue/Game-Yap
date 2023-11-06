const storeLastPage = (req, res, next) => {
    if (!req.session.loggedIn) {
      req.session.lastPage = req.originalUrl;
    }
    next();
  };
  
  module.exports = storeLastPage;