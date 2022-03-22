const express = require('express');

const router = express.Router();
const { insertProduct } = require('../controller/productController')
const { editAProduct } = require('../controller/productController')
const { getProductsFiltered } = require('../controller/productController')

router.put('/insert', insertProduct );
router.post('/:idProduct/edit', editAProduct );
router.get('/filtered', getProductsFiltered );

module.exports = router