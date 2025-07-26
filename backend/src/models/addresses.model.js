const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Invalid phone number']
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
<<<<<<< HEAD
  state: {
    type: String,
    required: true,
    trim: true
  },
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
  addressType: {
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