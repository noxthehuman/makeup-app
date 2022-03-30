const router = require('express').Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Product = require('../models/Product.model')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

function regexQuery (query) {
  return { $regex: query }
}

function lessThanQuery (query) {
  if(query === '') {
    return {$exists : 1}
  }
  
  return { $lte: query }
}

router.get('/products', async (req, res, next) => {
  try {
    const { productType, brand, price } = req.query
    const products = await Product.find({
      productType: regexQuery(productType),
      brand: regexQuery(brand),
      price: lessThanQuery(price)
    })
    console.log(req.query)
    res.render('index', { products })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
