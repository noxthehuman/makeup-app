const { Schema, model } = require("mongoose");

const eyesSchema = new Schema({
  mascara: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  eyeshadow: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  eyebrows: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  lips: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const faceSchema = new Schema({
  bronzer: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  blush: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  foundation: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const lipsSchema = new Schema({
  lipstick: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const lookSchema = new Schema({
  eyes: eyesSchema,
  face: faceSchema,
  lips: lipsSchema,
});

const Look = model("Look", lookSchema);

module.exports = Look;
