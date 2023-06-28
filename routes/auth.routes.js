const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

//GET SIGN UP PAGE
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
//POST LOGIN DETAILS
router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/signup", {
      errorMessage: "Please fill out all mandatory fields to sign in",
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        password: hashedPassword,
      });
    })
    .then((createdUser) => {
      res.redirect("/userProfile");
    })
    .catch((error) => {
      // copy the following if-else statement
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else {
        next(error);
      }
    });
});

//GET USER PROFILE PAGE
router.get("/userProfile", (req, res, next) => {
  res.render("users/user-profile");
});
module.exports = router;
