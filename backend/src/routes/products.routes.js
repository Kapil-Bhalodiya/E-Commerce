const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/products.controller');
const validateRequest = require('../middlewares/validate.request');
const { productSchema } = require('../validators/productValidator');
const { createUpload } = require('../utils/multer.config');
productRoutes.post(
    '/',
    createUpload('product').array('images', 10),
    validateRequest(productSchema),
    productController.createProduct
  );
productRoutes.get('/', productController.getAllProducts);

module.exports = {productRoutes};