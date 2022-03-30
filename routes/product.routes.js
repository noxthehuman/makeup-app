const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Product = require('../models/Product.model')
const Favorite = require('../models/Favorites.model')

function regexQuery (query) {
  return { $regex: query }
}

function lessThanQuery (query) {
  if(query === '') {
    return {$exists : 1}
  }
  
  return { $lte: query }
}
router.get('/', async (req, res, next) => {
  try {
    const { productType, brand, price } = req.query
    const products = await Product.find({
      productType: regexQuery(productType),
      brand: regexQuery(brand),
      price: lessThanQuery(price)
    })
    //console.log(req.session, 'i am in products and this is req session')
    console.log(req.query)
    res.render('index', { products })
  } catch (error) {
    console.log(error)
  }
})

router.post('/favorites', isLoggedIn, async (req, res, next) => {
  try {
    const { product } = req.body
    console.log(req.body)
    const foundFav = await Favorite.findOne({
      product: product,
      user: req.session.user._id
    })
    if (foundFav !== null) {
      await Favorite.findOneAndDelete(foundFav)
    }
    else {
      const newFav = await Favorite.create({
        user: req.session.user._id,
        product: product
      })
    }

    console.log(foundFav)
    
    res.json(newFav)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
