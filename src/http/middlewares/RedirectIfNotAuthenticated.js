const Middleware = require('./Middleware');

class RedirectIfNotAuthenticated extends Middleware {
  handle(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('errors', 'please login first!');
    return res.redirect('/auth/login');
  }
}

module.exports = new RedirectIfNotAuthenticated();