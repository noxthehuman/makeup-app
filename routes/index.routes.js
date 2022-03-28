const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

router.search("/", (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'makeup.p.rapidapi.com',
      'X-RapidAPI-Key': '46cbb44bdemsh14887596afca861p12aacfjsn4e39c5a66cde'
    }
  };
  
  fetch('https://makeup.p.rapidapi.com/products.json', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
})

module.exports = router;
