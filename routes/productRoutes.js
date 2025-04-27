const express = require('express');
const Product = require('../models/Product');
const productController = require('../controllers/productController');
const router = express.Router();
// product create route
router.post('', productController.store);

// create route
router.get('/create', productController.create);

// show product route
router.get('/:id', productController.show);

// delete product route
router.post('/:id/delete', productController.destroy);

// retrieve product route
router.get('', productController.product); 

module.exports = router;