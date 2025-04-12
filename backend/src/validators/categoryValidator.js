const Joi = require('joi');
const categorySchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .trim()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'any.required': 'Name is required'
        }),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .trim()
        .messages({
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description cannot exceed 500 characters',
            'any.required': 'Description is required'
        }),
    parent_category: Joi.string()
        .allow(null)
        .optional()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.pattern.base': 'Invalid parent category ID format'
        }),
    image_url: Joi.string()
        .uri()
        .allow(null)
        .optional()
        .messages({
            'string.uri': 'Image URL must be a valid URI'
        })
});

module.exports = { categorySchema };