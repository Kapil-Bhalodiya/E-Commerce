const express = require('express');
const productVariantRoutes = express.Router();
const productVariantController = require('../controllers/productvariants.controller');
const validateRequest = require('../middlewares/validate.request');
const { productVariantSchema } = require('../validators/productVariantValidator');

productVariantRoutes.post(
    '/',
    validateRequest(productVariantSchema),
    productVariantController.createProductVariant
);

productVariantRoutes.get('/', productVariantController.getAllProductVariants);

module.exports = { productVariantRoutes };