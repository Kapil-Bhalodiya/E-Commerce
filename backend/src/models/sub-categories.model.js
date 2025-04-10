const mongoose = require('mongoose')
const subCategoriesSchema = mongoose.Schema(
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
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
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

const SubCategory = mongoose.model('SubCategory', subCategoriesSchema)

module.exports = SubCategory  