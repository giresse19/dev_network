const mongoose = require("mongoose");

// DB config
const dbURI = require("../config/keys").mongoURI;

// connect to mongoDB
mongoose
  .connect(dbURI, {
    keepAlive: true,
    reconnectTries: 50,
    useMongoClient: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
