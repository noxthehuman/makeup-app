const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn")
const Product = require('../models/Product.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/products', async (req, res, next) => {
  try {
    const {productType, brand, price} = req.query
    const products = await Product.find({productType})
    console.log(req.query)
    console.log(products)
    res.render('index', {products})
  }
  catch(error) {
    console.log(error)
  }
})

module.exports = router;
