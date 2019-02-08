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

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const LogSchema = Schema({
    message: {type:String, required:true}
});

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Log = mongoose.model("Log", LogSchema);
