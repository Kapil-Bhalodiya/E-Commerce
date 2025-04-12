const ProductVariation = require('../models/product-variants.model');
const Product = require('../models/product.model');
const logger = require('../utils/logger');
const { ApiResponse } = require('../utils/ApiResponse');
const { ApiError } = require('../utils/ApiError');

exports.createProductVariant = async (req, res) => {
    try {
        const { product_id, color, size, stock_quantity, price } = req.body;
    
        const product = await Product.findById(product_id);
        if (!product) throw new ApiError(404, 'Product not found');
    
        const variant = new ProductVariation({
          product_id,
          color,
          size,
          stock_quantity,
          price
        });
    
        await variant.save();
        product.variant_ids.push(variant._id);
        await product.save();
    
        logger.info(`ProductVariant created: ${variant._id}`);
        return res.status(201).json(new ApiResponse(201, variant, 'ProductVariant created successfully!', true));
      } catch (error) {
        logger.error(`Error creating product variant: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error creating product variant');
      }
};

exports.getAllProductVariants = async (req, res) => {
    try {
        const variants = await ProductVariation.find().populate('product_id');
        return res.status(200).json(new ApiResponse(200, variants, 'ProductVariants fetched successfully!', true));
    } catch (error) {
        logger.error(`Error fetching product variants: ${error.message}`);
        throw new ApiError(500, 'Error fetching product variants');
    }
};