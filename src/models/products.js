const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
      type: String,
      required: false
  },
  color: {
      type: [],
      required: false
  },
  category: {
      type: [],
      required: false
  },
  price: {
      type: Number,
      required: false
  },
  description: {
      type: String,
      required: false
  },
  stock: {
      type: Number,
      required: false
  }

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;