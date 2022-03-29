const axios = require('axios').default

function getOptions(product_type, brand, price) {
    const options = {
        method: 'GET',
        url: 'https://makeup.p.rapidapi.com/products.json',
        params: {
            product_type,
            brand,
            price},
        headers: {
          'X-RapidAPI-Host': 'makeup.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.API_KEY
        }
    }
    return options
}
 
async function getAllProducts() {
    const productsResponse = await axios.request(getOptions())
    return productsResponse.data
}

async function getProducts({product_type, brand, price}) {
    const productsResponse = await axios.request(getOptions(product_type, brand, price))
    return productsResponse.data
}

module.exports = {getAllProducts, getProducts}