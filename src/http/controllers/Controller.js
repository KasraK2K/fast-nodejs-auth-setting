// import module
const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');

class Controller {
  constructor() {
    autoBind(this);
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = Controller;