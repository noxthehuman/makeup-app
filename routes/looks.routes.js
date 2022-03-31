const router = require("express").Router();
const Favorite = require('../models/Favorites.model');
const Look = require("../models/Looks.model");
const isLoggedIn = require('../middleware/isLoggedIn')

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

router.post('/create', isLoggedIn, async(req, res, next) => {
  const lookToCreate = {...req.body, createdBy: req.session.user._id}
  const createdLook = await Look.create(lookToCreate)
  console.log(createdLook)
  res.json(createdLook)
})

module.exports = router;
