const router = require("express").Router();

/* GET profile page */
router.get("/", (req, res, next) => {
  res.render("profile");
});

module.exports = router;
