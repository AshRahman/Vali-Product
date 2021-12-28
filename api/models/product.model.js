const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name:{type: String,required: true,},
    product_type:{type: String, required: true},
    product_price:{type: String, required: true},
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;