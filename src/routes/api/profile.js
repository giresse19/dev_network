const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load profile model
const models = require("../../dbConnect/models");

/* 
@route  GET api/v1/profile
 @desc Return profile for current users
 @access  private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //console.log(user);
    models.Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

/* 
@route  POST api/v1/profile
 @desc Create or Edit user profile
 @access  private
*/

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills - split into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        profile
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then(profile => res.json(profile));
      } else {
        // create

        // check for handle
        models.Profile.findOne({ handle: profileFields.handle }).then(
          profile => {
            if (profile) {
              errors.handle = "That handle already exist";
              res.status(400).json(errors);
            }

            // save profile
            new models.Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        );
      }
    });
  }
);

module.exports = router;
