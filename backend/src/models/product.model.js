const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true,
        },
        base_price: {
            type: Number,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        image_url: {
            type: String,
            trim: true,
            default: null,
        },
        variant_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductVariant',
        }],
    },
    {
        timestamps: true
    }
);

productSchema.index({ name: 1, subcategory: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;