const Joi = require('joi');

// Validation schema for creating an address
const createAddressSchema = Joi.object({
    fullName: Joi.string().trim().required().max(100).messages({
        'string.base': `"Full Name" should be a string`,
        'string.empty': `"Full Name" cannot be empty`,
        'any.required': `"Full Name" is required`,
    }),
    phone: Joi.string().trim().regex(/^\+?[0-9]{7,15}$/).optional().messages({
        'string.pattern.base': `"Phone" must be a valid phone number`,
    }),
    street: Joi.string().trim().required().max(255).messages({
        'string.base': `"Street" should be a string`,
        'string.empty': `"Street" cannot be empty`,
        'any.required': `"Street" is required`,
    }),
    street2: Joi.string().trim().optional().max(255).messages({
        'string.base': `"Street2" should be a string`,
    }),
    city: Joi.string().trim().required().max(100).messages({
        'string.base': `"City" should be a string`,
        'string.empty': `"City" cannot be empty`,
        'any.required': `"City" is required`,
    }),
    state: Joi.string().trim().required().max(100).messages({
        'string.base': `"State" should be a string`,
        'string.empty': `"State" cannot be empty`,
        'any.required': `"State" is required`,
    }),
    country: Joi.string().trim().required().max(100).messages({
        'string.base': `"Country" should be a string`,
        'string.empty': `"Country" cannot be empty`,
        'any.required': `"Country" is required`,
    }),
    postalCode: Joi.string().trim().required().max(20).messages({
        'string.base': `"Postal Code" should be a string`,
        'string.empty': `"Postal Code" cannot be empty`,
        'any.required': `"Postal Code" is required`,
    }),
    isDefault: Joi.boolean().optional(),
    label: Joi.string().valid('home', 'work', 'other').default('home'),
});

// Validation schema for updating an address
const updateAddressSchema = Joi.object({
    fullname: Joi.string().trim().required().max(100),
    phone: Joi.string().trim().regex(/^\+?[0-9]{7,15}$/).optional(),
    street: Joi.string().trim().required().max(255),
    street2: Joi.string().trim().optional().max(255),
    city: Joi.string().trim().required().max(100),
    state: Joi.string().trim().required().max(100),
    country: Joi.string().trim().required().max(100),
    postalCode: Joi.string().trim().required().max(20),
    isDefault: Joi.boolean().optional(),
    label: Joi.string().valid('home', 'work', 'other').default('home'),
});

module.exports = { createAddressSchema, updateAddressSchema };
