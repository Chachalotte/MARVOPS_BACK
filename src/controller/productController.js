const productModel = require("../models/products");
const app = require('../../app')

exports.insertProduct = (req, res, next) => {
    const newProduct = new productModel(req.body);
    newProduct.save();
    res.status(200).send(newProduct);
};