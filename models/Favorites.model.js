const { Schema, model } = require("mongoose");

const favoriteModel = new Schema({
    user:{ type: Schema.Types.ObjectId, ref:"User" },
    product: {type: Schema.Types.ObjectId, ref: "Product"}
})

const Favorite = model('Favorite', favoriteModel)

module.exports= Favorite