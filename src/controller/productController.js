const productModel = require("../models/products");
const app = require('../../app')

exports.insertProduct = (req, res, next) => {
    const newProduct = new productModel(req.body);
    newProduct.save();
    res.status(200).send(newProduct);
};

exports.editAProduct = (req, res, next) => {
    const modelId = req.params.idProduct;
    const newName = req.body.name;

    productModel.findById(modelId).then((model) => {
        return Object.assign(model, {title: newName});
    }).then((model) => {
        return model.save();
    }).then((updatedModel) => {
        res.json({
            msg: 'model updated',
            updatedModel
        });
    }).catch((err) => {
        res.send(err);
    });
}

exports.getProductsFiltered = (req, res, next) => {
    const filters = req.body.filters;

    filters.forEach(element => {
        console.log(element);
        productModel.find({"category.type" : element }).then((model) => {
            console.log('trouvé !');
        });
    })
}

