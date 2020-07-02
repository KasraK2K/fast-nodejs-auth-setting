// if node env not production use .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// import module
const express = require("express");
const http = require("http");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const pug = require('pug');
const flash = require('connect-flash'); // or use express-flash

// constant
const app = express();
const webRoutes = require('./routes/web');
const Helpers = require("./Helpers");

class Application {
  constructor() {
    this.databaseConnection();
    this.configs();
    this.init();
  }

  // mongodb setting
  async databaseConnection() {
    await mongoose
      .connect("mongodb://localhost:27017/passportAuth", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) =>
        console.log(
          `database is connected and database name is: ${result.connection.name}`
        )
      )
      .catch((error) =>
        console.log("database connection error:", error.message)
      );
  }

  configs()
  {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
      secure: true,
      httpOnly: true,
      secret: 'my secret key',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }));
    require("./passport/passport-local");
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static('public'));
    app.set("view engine", 'pug');
    app.set("views", path.resolve('src/views'));

    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });

    app.use('/', webRoutes);
  }

  // init server by listening port
  init() {
    const server = http.createServer(app);
    const port = process.env.PORT || 3000;
    server.listen(port, () =>
      console.log(`server is starting on port ${port}`)
    );
  }
}

const application = new Application();
