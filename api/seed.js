require('dotenv/config')
//require('../db')
const Product = require('../models/Product.model')
const { getAllProducts } = require('../api/get.products')
const mongoose = require('mongoose')

function addImageTypeLink (apiProduct) {
  return {
    ...apiProduct,
    productType: apiProduct.product_type,
    imageUrl: apiProduct.image_link,
    linkToProduct: apiProduct.product_link
  }
}

async function seedDatabase () {
  try {
    const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/makeup-app";

    await mongoose.connect(MONGO_URI)
    await Product.deleteMany()
    const products = await getAllProducts()
    const mappedProducts =  products.map(addImageTypeLink)
    const insertedProd = await Product.insertMany(mappedProducts)
    console.log(
      'Successfully added ' + insertedProd.length + 'items in the database'
    )
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
  }
}

seedDatabase()
