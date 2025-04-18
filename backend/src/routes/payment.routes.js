require('dotenv').config()
const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK);
const paymentRoutes = express.Router();

paymentRoutes.post('/create-payment-intent', async (req, res) => {
    console.log("Order Api Called...")
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'inr',
            automatic_payment_methods: { enabled: true }
        });
        res.json(paymentIntent.client_secret);
    } catch (error) {
        console.error('Create payment intent error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {paymentRoutes}