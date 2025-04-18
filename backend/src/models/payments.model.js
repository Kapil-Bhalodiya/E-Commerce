// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
//   amount: { type: Number, required: true },
//   method: { type: String, enum: ['credit_card','debit_card', 'paypal', 'stripe', 'cod'], required: true },
//   status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
//   transactionId: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Payment', paymentSchema);

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false,
    index: true,
  },
  method: {
    type: String,
    enum: ['card', 'paypal', 'cod', 'wallet', 'bank_transfer'],
    required: true,
  },
  provider: { type: String, default: null }, // Stripe, Razorpay, etc.
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
    index: true,
  },
  stripePaymentIntentId: {
    type: String,
    trim: true,
    default: null,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paidAt: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Payment', paymentSchema);

