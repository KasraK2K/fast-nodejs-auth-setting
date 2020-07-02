// import module
const User = require('../../models/user');
const Controller = require("./Controller");
const passport = require('passport');

class LoginController extends Controller {
  showLoginForm(req, res) {
    res.render('auth/login');
  }

  async loginProccess(req, res, next) {
    return this.login(req, res, next);
  }

  login(req, res, next) {
    passport.authenticate('local.login', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
    })(req, res, next);
  }
}

module.exports = new LoginController();