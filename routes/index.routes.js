const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const base_url = 'http://localhost:3000/'
const apiHost = 'https://makeup.p.rapidapi.com'
const apiKey = '46cbb44bdemsh14887596afca861p12aacfjsn4e39c5a66cde'


router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'makeup.p.rapidapi.com',
		'X-RapidAPI-Key': '46cbb44bdemsh14887596afca861p12aacfjsn4e39c5a66cde'
	}
};


router.get("/", async (req, res) => {
  const url = `${apiHost}/products.json?${req.body}&appid=${apiKey}`
  try {
    fetch('https://makeup.p.rapidapi.com/products.json?brand=colourpop&product_category=lipstick', options)
	  .then(response => response.json())
	  .then(response => console.log(response))
    
    const response = await fetch(url)
    const productInfo = await response.json()


  }
  catch(error) {
    console.error(error)
  }

})

module.exports = router;
