const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Contact Name (for shipping to someone else)
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  // Optional phone (could differ from account phone)
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Invalid phone number']
  },

  street: {
    type: String,
    required: true,
    trim: true
  },
  street2: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },

  isDefault: {
    type: Boolean,
    default: false
  },

  label: {
    type: String,
    enum: ['home', 'work', 'other'],
    default: 'home'
  },

  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },

}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);