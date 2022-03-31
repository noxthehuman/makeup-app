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

    const looks = await Look.find({ createdBy: req.user._id })
      .populate("mascara eyeliner eyeshadow eyebrows bronzer blush foundation lipstick")

    res.render("profile", { user: req.user, userFavorite, looks });
  } catch (error) {
    console.error(error);
  }
});

router.post("/delete/favorite/:id", isLoggedin, async (req, res) => {
  try {
    const id = req.params.id;
    await Favorite.findOneAndDelete({ user: req.user._id, product: id });
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

router.post("/delete/look/:id", isLoggedin, async (req, res) => {
  try {
    const id = req.params.id;
    await Look.findOneAndDelete({ user: req.user._id, _id: id });
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
