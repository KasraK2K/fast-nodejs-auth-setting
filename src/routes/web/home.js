// import module
const express = require("express");
const router = express.Router();

// middlewares
const RedirectIfNotAuthenticated = require('./../../http/middlewares/RedirectIfNotAuthenticated');

router.route('/')
  .get(RedirectIfNotAuthenticated.handle, (req, res) => {
    res.json('GET: hello, this is a home page');
  })
  .post((req, res) => {
    res.json('POST: hello, this is a home page');
  });


// export
module.exports = router;