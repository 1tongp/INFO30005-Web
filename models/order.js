const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// required information for order
var OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },

    snacksList:{
        type: Array,
        required: true,
        default: []
    },

    totalPrice:{
        type: Number,
        required: true,
        default: 0
    },

    // isChangeable === true for able to change, false otherwise
    isChangeable:{
        type: Boolean,
        default: true
    },

    // isCanceled === ture for order already canceled, false otherwise
    isCanceled:{
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        default: 'outstanding',
    },

    // isDelivered === true for order has been delivered, false otherwise
    isDelivered:{
        type: Boolean,
        default: false
    },

    ratings:{
        type: Number,
        default: null
    },
    comments:{
        type: String,
        default: null
    },

    discount:{
        type: Boolean,
        default: false
    }

}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }});

module.exports = mongoose.model("Order",OrderSchema);

