const Joi = require('joi');

// Validation schema for creating an address
const createAddressSchema = Joi.object({
<<<<<<< HEAD
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
=======
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
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    }),
    city: Joi.string().trim().required().max(100).messages({
        'string.base': `"City" should be a string`,
        'string.empty': `"City" cannot be empty`,
        'any.required': `"City" is required`,
    }),
<<<<<<< HEAD
    state: Joi.string().trim().required().max(100).messages({
        'string.base': `"State" should be a string`,
        'string.empty': `"State" cannot be empty`,
        'any.required': `"State" is required`,
    }),
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    label: Joi.string().valid('home', 'work', 'other').default('home'),
=======
    addressType: Joi.string().valid('home', 'work', 'other').default('home'),
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
});

// Validation schema for updating an address
const updateAddressSchema = Joi.object({
<<<<<<< HEAD
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
=======
    firstName: Joi.string().trim().required().max(100),
    phone: Joi.string().trim().regex(/^\+?[0-9]{7,15}$/).optional(),
    address1: Joi.string().trim().required().max(255),
    address2: Joi.string().trim().optional().max(255),
    city: Joi.string().trim().required().max(100),
    country: Joi.string().trim().required().max(100),
    postalCode: Joi.string().trim().required().max(20),
    isDefault: Joi.boolean().optional(),
    addressType: Joi.string().valid('home', 'work', 'other').default('home'),
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
});

module.exports = { createAddressSchema, updateAddressSchema };
