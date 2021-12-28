const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productValSchema = new Schema({
    product_name:{type: String,required: true,},
    product_type:{type: String, required: true},
    product_price:{type: String, required: true},
    created_by:{type: String, required: true},
    votes:{type: Number,default: 0}
}, {
    timestamps: true,
});

const ProductValidation = mongoose.model('ProductValidation', productValSchema);

module.exports = ProductValidation;