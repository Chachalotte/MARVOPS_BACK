const mongoose = require("mongoose");
const { Schema } = mongoose;

const filterSchema = new Schema({ category: String, price: Number, stock: Number });
const ProductSchema = new Schema({
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
    filters: {
    type: [filterSchema],
    required: true
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