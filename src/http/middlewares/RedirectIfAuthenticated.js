const Middleware = require('./Middleware');

class RedirectIfAuthenticated extends Middleware {
  handle(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('back');
    }
    next();
  }
}

module.exports = new RedirectIfAuthenticated();