const mongoose = require('mongoose')
const categoriesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        parent_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
        image_url: {
            type: String,
            trim: true,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categoriesSchema)

module.exports = Category  