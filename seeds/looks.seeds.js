require("../db/index");
const mongoose = require("mongoose");
const Look = require("../models/Looks.model");
const Product = require("../models/Product.model");

const looks = [];

async function seedLooks() {
  try {
    const lookCreated = await Look.create(looks);
    console.log(`${lookCreated.length} looks were created.`);
  } catch (err) {
    console.error(err);
  }
}

async function getProducts() {
  try {
    const productFound = await Product.find();
    console.log(productFound);
  } catch (err) {
    console.error(err);
  }
}

getProducts();
seedLooks();
