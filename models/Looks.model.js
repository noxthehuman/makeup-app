const { Schema, model } = require("mongoose");

const eyesSchema = new Schema({
  mascara: { type: Schema.Types.ObjectId, ref: "Product" },
  eyeshadow: { type: Schema.Types.ObjectId, ref: "Product" },
  eyebrows: { type: Schema.Types.ObjectId, ref: "Product" },
  lips: { type: Schema.Types.ObjectId, ref: "Product" },
});

const faceSchema = new Schema({
  bronzer: { type: Schema.Types.ObjectId, ref: "Product" },
  blush: { type: Schema.Types.ObjectId, ref: "Product" },
  foundation: { type: Schema.Types.ObjectId, ref: "Product" },
});

const lipsSchema = new Schema({
  lipstick: { type: Schema.Types.ObjectId, ref: "Product" },
});

const lookSchema = new Schema({
  eyes: eyesSchema,
  face: faceSchema,
  lips: lipsSchema,
});

const Look = model("Look", lookSchema);

module.exports = Look;
