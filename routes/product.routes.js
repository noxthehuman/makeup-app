const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Product = require('../models/Product.model')
const User = require('../models/User.model')
const Favorite = require('../models/Favorites.model')

router.post('/products', async (req, res, next) => {
  try {
    const { product } = req.body
    console.log(req.body)
    const foundFav = await Favorite.find({
      product: product,
      user: req.session.user._id
    })
    if (foundFav !== null) {
      await Favorite.findOneAndDelete(foundFav)
    }

    const newFav = await Favorite.create({
      user: req.session.user._id,
      product: product
    })
    res.json(newFav)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
