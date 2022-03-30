const router = require("express").Router();
const isLoggedin = require("../middleware/isLoggedIn");
const Favorite = require('../models/Favorites.model')
// const fileUploader = require("../config/cloudinary.config");

/* GET profile page */
router.get('/', isLoggedin, async (req, res, next) => {
  try {
    const userFavorite = await Favorite.find({
      user: req.session.user._id
    }).populate("product")
    
    res.render('profile', { user: req.user, userFavorite })
  } 
  catch (error) {
    console.error(error)
  }
})

module.exports = router;
