const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    data:{
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['credit card', 'Debit Card', 'bank account', 'other'], // Add more types as needed
        required: true
    },
    nickname: {
        type: String,
        required: false,
        default: ''
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Data',dataSchema);
