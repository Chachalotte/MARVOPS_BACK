const express = require('express');

const router = express.Router();
const { insertProduct } = require('../controller/productController')

router.post('/insert', insertProduct );


module.exports = router