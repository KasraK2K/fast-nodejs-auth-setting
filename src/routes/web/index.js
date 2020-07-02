// import module
const express = require("express");
const router = express.Router();

const home = require('./home');
const admin = require('./admin');
const auth = require('./auth');

// routes
router.use('/', home);
router.use('/admin', admin);
router.use('/auth', auth);

// export
module.exports = router;