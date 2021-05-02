const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// required information for customer
var CustomerSchema = new Schema({
    givenName:{
        type: String,
        required: true,
    },
    familyName:{
        type: String,
        required: true,
    },
    loginEmail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },

    location:{
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number]
        }
    },
    createTime:{
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model("Customer",CustomerSchema);