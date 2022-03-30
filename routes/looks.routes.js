const router = require("express").Router();
const Favorite = require('../models/Favorites.model')

/* GET profile page */
router.get("/", async (req, res, next) => {
  try {
    const favProducts = await Favorite.find({user: req.session.user._id}).populate("product")
    res.render("looks", {favProducts});
  } 
  catch(error) {
    console.error(error)
  } 
});

module.exports = router;
