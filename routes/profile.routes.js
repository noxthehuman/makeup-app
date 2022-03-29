const router = require("express").Router();
const userModel = require("../models/User.model");
const async = require("hbs/lib/async");

/* GET profile page */
router.get("/", (req, res, next) => {
  const { userId } = req.params;
  console.log(req.params);

  userModel.findById(userId).then((user) => {
    res.render("profile", user);
  });
});

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  console.log(req.params);

  userModel.findById(userId).then((user) => {
    res.render("profile", user);
  });
});

module.exports = router;
