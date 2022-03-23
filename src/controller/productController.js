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
    const price = req.body.filters[0].price;
    const category = req.body.filters[0].category;

        productModel.find({filters:{ $elemMatch: { $or: [{ category: category},{price: price} ] }}}).then((model) => {
                console.log('trouvé !');
                res.json({
                    msg: `model updated${model}`                            
                });
            });

}

