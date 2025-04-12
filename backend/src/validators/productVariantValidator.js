const Joi = require('joi');

const productVariantSchema = Joi.object({
    product_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    color: Joi.string().valid('Red', 'Blue', 'Green', 'Black', 'White', 'Pink', 'Rust Orange', 'Dark Nevy', 'Purple','Khaki').required(),
    size: Joi.string().valid('S', 'M', 'L', 'XL', 'XXL').required(),
    stock_quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()
});

module.exports = { productVariantSchema };