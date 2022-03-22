const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  stock: {
      type: Number,
      required: true
  }

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;