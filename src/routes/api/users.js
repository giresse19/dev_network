/* 
@route  GET api/v1/users/register
 @desc register user
 @access  public
*/

const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const models = require("../../dbConnect/models");
const express = require("express");
const router = express.Router();

// register users api

router.get("/test", (req, res, callback) => res.json({ msg: "Users work" }));

router.post("/register", (req, res) => {
  models.User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new models.User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/* 
@route  GET api/v1/users/login
 @desc Login users/ returning jwt
 @access  public
*/
router.post("login", () => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  models.User.findOne({ email: email }).then(user => {
    // check for user
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "success" });
      } else {
        return res.status(400).json({ password: " Password incorrect" });
      }
    });
  });
});

module.exports = router;
