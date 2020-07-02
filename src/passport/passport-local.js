const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./../models/user');

// passport config
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// local register
passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, false, req.flash('errors', 'user is already exist'));

    const newUser = new User({
      name: req.body.name,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(15)),
    });

    newUser.save(err => {
      if (err) return done(null, false, req.flash('errors', 'register is unsuccessful. please try again.'))
      done(null, newUser, req.flash('success', 'user created successfuly'));
    });
  });
}));

// local login
passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ 'email': email.toLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user || !user.comparePassword(password)) return done(null, false, req.flash('errors', 'wrong email or password'));
    done(null, user);
  });
}));