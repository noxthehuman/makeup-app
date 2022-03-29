const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productType: String,
  brand: String,
  name: String,
  description: String,
  price: Number,
  imageUrl: {
    type: String,
  },
  linkToProduct: {
    type: String,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
