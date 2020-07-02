const autoBind = require("auto-bind");

class Helpers {
  constructor(req, res) {
    autoBind(this);
    this.req = req;
    this.res = res;
  }

  getObjects() {
    return {
      auth: this.auth(),
      ...this.getGlobalVariables(),
      req: this.req
    };
  }

  auth() {
    return {
      check: this.req.isAuthenticated(),
      user: this.req.user,
    };
  }

  getGlobalVariables() {
    return {
      errors: this.req.flash("errors"),
      success: this.req.flash("success"),
      warning: this.req.flash("warning"),
      info: this.req.flash("info"),
    };
  }
}

module.exports = Helpers;