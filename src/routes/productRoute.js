const express = require('express');

const router = express.Router();
const { insertProduct } = require('../controller/productController')
const { editAProduct } = require('../controller/productController')
const { getProductsFiltered } = require('../controller/productController')
const { deleteAProduct } = require('../controller/productController')
const { selectAProduct } = require('../controller/productController')

router.put('/insert', insertProduct );
router.post('/:idProduct/edit', editAProduct );
router.get('/filtered', getProductsFiltered );
router.delete('/:idProduct/delete', deleteAProduct);
router.get('/:idProduct/select', selectAProduct);

module.exports = router