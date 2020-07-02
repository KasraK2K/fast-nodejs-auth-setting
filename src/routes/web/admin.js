// import module
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

router.route('/')
  .get((req, res) => {
    res.json('GET: hello, this is a admin page');
  })
  .post((req, res) => {
    res.json('POST: hello, this is a admin page');
  });


// export
module.exports = router;