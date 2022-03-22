const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
      type: String,
      required: false
  },
  category: {
      type: String,
      required: true
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;