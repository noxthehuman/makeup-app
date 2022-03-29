const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn")
const {getProducts, getAllProducts} = require("../api/get.products")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/products', async (req, res, next) => {
  const products =  await getProducts(req.query)
  res.render('index', {products})
})

module.exports = router;
