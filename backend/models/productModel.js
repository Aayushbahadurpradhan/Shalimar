const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brandName: String,
    category: String,
    productImage: {
        type: [String],
        default: []
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
