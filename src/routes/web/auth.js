// import module
const express = require("express");
const router = express.Router();

// controllers
const LoginController = require('../../http/controllers/LoginController');
const RegisterController = require('../../http/controllers/RegisterController');

// middlewares
const RedirectIfAuthenticated = require('../../http/middlewares/RedirectIfAuthenticated');

router.route('/login')
  .get(RedirectIfAuthenticated.handle, LoginController.showLoginForm)
  .post(LoginController.loginProccess);

router.route('/register')
  .get(RedirectIfAuthenticated.handle, RegisterController.showRegisterForm)
  .post(RegisterController.registerProccess);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
})

// export
module.exports = router;