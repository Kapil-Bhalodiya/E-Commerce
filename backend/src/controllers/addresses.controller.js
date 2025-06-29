const Address = require('../models/addresses.model');
const { createAddressSchema, updateAddressSchema } = require('../validators/addressValidator'); // Import Joi validation schemas
const {ApiError} = require('../utils/ApiError'); // Assuming you have an ApiError utility to handle errors

// Create a new address
exports.createAddress = async (req, res, next) => {
  try {
    // Validate request body using Joi schema
    const { error } = createAddressSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map(err => err.message);
      throw new ApiError(validationErrors.join(', '), 400);
    }

    const { firstName, lastName, phone, addressLine1, addressLine2, city, state, postalCode, country, addressType, isDefault } = req.body;
    const userId = req.user?._id || req.userId;

    const address = new Address({
      userId,
      fullName: `${firstName} ${lastName}`,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      addressType,
      isDefault,
    });

    if (isDefault) {
      // Set all other addresses as not default when creating a new default address
      await Address.updateMany({ userId }, { isDefault: false });
    }

    await address.save();

    res.status(201).json({
      success: true,
      message: 'Address created successfully',
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

// Get all addresses for the current user
exports.getAddresses = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.userId;
    const addresses = await Address.find({ userId, isDeleted: false });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing address
exports.updateAddress = async (req, res, next) => {
  try {
    // Validate request body using Joi schema
    const { error } = updateAddressSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map(err => err.message);
      throw new ApiError(validationErrors.join(', '), 400);
    }

    const { addressId } = req.params;
    const { fullname, phone, street, street2, city, state, postalCode, country, label, isDefault } = req.body;
    const userId = req.user._id;

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ApiError('Address not found', 404);
    }

    // If changing to default address, update all other addresses for the user
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    address.fullname = fullname;
    address.phone = phone;
    address.street = street;
    address.street2 = street2;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;
    address.label = label;
    address.isDefault = isDefault;

    await address.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an address (soft delete)
exports.deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const userId = req.user._id;

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      throw new ApiError('Address not found', 404);
    }

    // Soft delete the address
    address.isDeleted = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
