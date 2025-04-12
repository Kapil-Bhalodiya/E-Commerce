const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
        description: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 },
        brand: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true, index: true },
        base_price: { type: Number, required: true, min: 0 },
        tags: { type: [String], default: [] },
        image_urls: {
            type: [String],
            default: [],
            validate: { validator: arr => arr.length <= 10, message: 'Maximum 10 images per product' }
        },
        variant_ids: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariation' }], default: [] }
    },
    {
        timestamps: true
    }
);

productSchema.index({ name: 1, subcategory: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;