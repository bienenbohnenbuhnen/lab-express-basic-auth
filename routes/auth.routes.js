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
    .catch((error) => next(error));
});
//GET USER PROFILE PAGE
router.get("/userProfile", (req, res, next) => {
  res.render("users/user-profile");
});
module.exports = router;
