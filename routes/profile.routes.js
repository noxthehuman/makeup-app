const router = require("express").Router();
const isLoggedin = require("../middleware/isLoggedIn");
const Favorite = require("../models/Favorites.model");
const Look = require("../models/Looks.model");

/* GET profile page */
router.get("/", isLoggedin, async (req, res, next) => {
  try {
    const userFavorite = await Favorite.find({
      user: req.session.user._id,
    }).populate("product");

    const looks = await Look.find({ createdBy: req.user._id }).populate(
      "mascara",
      "eyeliner",
      "eyeshadow",
      "eyebrows",
      "bronzer",
      "blush",
      "foundation",
      "lipstick"
    );

    res.render("profile", { user: req.user, userFavorite, looks });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
