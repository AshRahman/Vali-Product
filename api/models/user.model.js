const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    password:{type: String, required: true},
    validator:{type: Boolean,default: false}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;