const Joi = require('joi');

// Validation schema for creating an address
const createAddressSchema = Joi.object({
    firstName: Joi.string().trim().required().max(100).messages({
        'string.base': `"First Name" should be a string`,
        'string.empty': `"First Name" cannot be empty`,
        'any.required': `"First Name" is required`,
    }),
    lastName: Joi.string().trim().required().max(100).messages({
        'string.base': `"Last Name" should be a string`,
        'string.empty': `"Last Name" cannot be empty`,
        'any.required': `"Last Name" is required`,
    }),
    phone: Joi.string().trim().optional().messages({
        'string.pattern.base': `"Phone" must be a valid phone number`,
    }),
    address1: Joi.string().trim().required().max(255).messages({
        'string.base': `"address1" should be a string`,
        'string.empty': `"address1" cannot be empty`,
        'any.required': `"address1" is required`,
    }),
    address2: Joi.string().trim().optional().max(255).messages({
        'string.base': `"address2" should be a string`,
    }),
    city: Joi.string().trim().required().max(100).messages({
        'string.base': `"City" should be a string`,
        'string.empty': `"City" cannot be empty`,
        'any.required': `"City" is required`,
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
    addressType: Joi.string().valid('home', 'work', 'other').default('home'),
});

// Validation schema for updating an address
const updateAddressSchema = Joi.object({
    firstName: Joi.string().trim().required().max(100),
    phone: Joi.string().trim().regex(/^\+?[0-9]{7,15}$/).optional(),
    address1: Joi.string().trim().required().max(255),
    address2: Joi.string().trim().optional().max(255),
    city: Joi.string().trim().required().max(100),
    country: Joi.string().trim().required().max(100),
    postalCode: Joi.string().trim().required().max(20),
    isDefault: Joi.boolean().optional(),
    addressType: Joi.string().valid('home', 'work', 'other').default('home'),
});

module.exports = { createAddressSchema, updateAddressSchema };
