const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// required information for vendor
var VendorSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number]
        }
    },
    password: {
        type: String,
        required: true,
    },
    currentAddress: {
        type: String
    },
    parked: {
        type: Boolean,
        required: true,
        default: true
    },
    readyForOrder: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Vendor",VendorSchema);