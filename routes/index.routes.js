const router = require("express").Router();
const Product = require("../models/Product.model");

/* GET home page */
router.get("/", (req, res, next) => {
  //console.log(req.session, 'i am in products and this is req session')
  res.render("index");
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get("/product-detail", async (req, res, next) => {
  try {
    const productToDetail = await Product.findOne(req.body);
    res.render("../views/prod-detail.hbs", { productToDetail });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
