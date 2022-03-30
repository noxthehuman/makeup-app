const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Product = require("../models/Product.model");

/* GET home page */
router.get("/", (req, res, next) => {
  //console.log(req.session, 'i am in products and this is req session')
  res.render("index");
});

router.get("/product-detail", (req, res, next) => {
  res.render("../views/prod-detail.hbs");
});

module.exports = router;
