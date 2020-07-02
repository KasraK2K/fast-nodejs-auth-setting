// import module
const User = require('../../models/user');
const Controller = require("./Controller");
const passport = require('passport');

class RegisterController extends Controller {
  showRegisterForm(req, res) {
    res.render('auth/register');
  }

  registerProccess(req, res, next) {
    return this.register(req, res, next);
  }

  register(req, res, next) {
    passport.authenticate('local.register', {
      successRedirect: '/',
      failureRedirect: '/auth/register',
    })(req, res, next);
  }
}

module.exports = new RegisterController();