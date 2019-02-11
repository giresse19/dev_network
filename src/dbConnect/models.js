const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// DB config
const dbURI = require("../../config/keys").mongoURI;

// connect to mongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

const LogSchema = new Schema({
  message: { type: String, required: true }
});

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Log = mongoose.model("Log", LogSchema);
