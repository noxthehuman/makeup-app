const { Schema, model } = require("mongoose");

const lookSchema = new Schema({
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  mascara: { type: Schema.Types.ObjectId, ref: "Product" },
  eyeliner: {type: Schema.Types.ObjectId, ref: "Product"},
  eyeshadow: { type: Schema.Types.ObjectId, ref: "Product" },
  eyebrows: { type: Schema.Types.ObjectId, ref: "Product" },
  bronzer: { type: Schema.Types.ObjectId, ref: "Product"},
  blush: { type: Schema.Types.ObjectId, ref: "Product" },
  foundation: { type: Schema.Types.ObjectId, ref: "Product" },
  lipstick: { type: Schema.Types.ObjectId, ref: "Product" }
});

const Look = model("Look", lookSchema);

module.exports = Look;
