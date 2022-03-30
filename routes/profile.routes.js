const router = require("express").Router();
const isLoggedin = require("../middleware/isLoggedIn");
const Favorite = require('../models/Favorites.model')
const Looks = require('../models/Looks.model')

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

// router.post('/', isLoggedin, async (req, res, next) => {
//   try {
//     console.log(req.body)
//     const lookCreated = await Looks.create(req.body)
//     res.render('profile', {lookCreated}) 
//   }
//   catch(error) {
//     console.error(error)
//   }
// })

module.exports = router;
