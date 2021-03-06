const bodyParser = require("body-parser");
const post = require("./routes/api/post");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");
const passport = require("passport");

const express = require("express");

const app = express();

// body parser middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  // to parse responses from services and return them as proper API responses
  res.apiRespnse = (err, message) => {
    let status = err ? err.status || 500 : 200;
    message = (err && err.message) || message;

    return res.status(status).end(JSON.stringify({ status, message }));
  };
  next();
});

// passport middleware
app.use(passport.initialize())

// passport config
require("../config/passport")(passport);

// use routes
app.use("/api/v1/users", users);

app.use("/api/v1/post", post);

app.use("/api/v1/profile", profile);



module.exports = app;
