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

// user schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

// profile schema
const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  handle: { type: String, required: true, max: 40 },
  company: { type: String, required: false },
  website: { type: String, required: false },
  location: { type: String, required: false },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String, required: false },
  githubusername: { type: String, required: false },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: false
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        required: false
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: false
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        required: false
      }
    }
  ],
  social: {
    youtube: {
      type: String,
      required: false
    },
    facebook: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
    linkedin: {
      type: String,
      required: false
    },
    instagram: {
      type: String,
      required: false
    },
    date: { type: Date, default: Date.now }
  }
});

// log schema
const LogSchema = new Schema({
  message: { type: String, required: true }
});

module.exports.User = mongoose.model("User", UserSchema);
module.exports.Profile = mongoose.model("Profile", ProfileSchema);
module.exports.Log = mongoose.model("Log", LogSchema);
