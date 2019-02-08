const post = require("./post");
const profile = require("./profile");
const users = require("./users");

const express = require("express");

const app = express();

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

app.get("/", (req, res) => res.send("hello world!"));

app.get("/api/v1/users", (req, res) => users(res.apiRespnse));

app.use((req, res) =>
  res.apiRespnse({ status: 404, message: "Page not found" })
);

app.use((err, req, res, next) => res.apiRespnse("Server error", +err));
module.exports = app;
