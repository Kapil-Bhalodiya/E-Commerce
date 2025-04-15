const Joi = require('joi');
const AppError = require('../utils/AppError');

const orderSchema = Joi.object({
  items: Joi.array()
    .min(1)
    .items(
      Joi.object({
        productId: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'string.pattern.base': 'Invalid product ID',
          }),
        quantity: Joi.number().integer().min(1).required().messages({
          'number.min': 'Quantity must be at least 1',
        }),
      })
    )
    .required()
    .messages({
      'array.min': 'Items must be a non-empty array',
    }),
  shippingAddressId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid shipping address ID',
    }),
  paymentMethod: Joi.string()
    .valid('credit_card', 'paypal', 'stripe', 'cod')
    .required()
    .messages({
      'any.only': 'Invalid payment method',
    }),
  couponCode: Joi.string().optional().allow('').messages({
    'string.base': 'Coupon code must be a string',
  }),
  notes: Joi.string().optional().allow('').messages({
    'string.base': 'Notes must be a string',
  }),
});

const validateOrderCreation = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(', ');
    return next(new AppError(errorMessage, 400));
  }
  next();
};

module.exports = { validateOrderCreation };