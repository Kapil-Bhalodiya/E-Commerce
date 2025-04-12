const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    brand: Joi.string().min(2).max(50).required(),
    subcategory: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    base_price: Joi.number().min(0).required(),
    tags: Joi.string().allow('').optional()
});

module.exports = { productSchema };