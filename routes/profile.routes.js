const router = require("express").Router();
const userModel = require("../models/User.model");
const async = require("hbs/lib/async");
const isLoggedin = require("../middleware/isLoggedIn");
// const fileUploader = require("../config/cloudinary.config");

/* GET profile page */

router.get("/", isLoggedin, (req, res, next) => {
  console.log(req.user);
  res.render("profile", { user: req.user });
});

module.exports = router;
