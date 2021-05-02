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
    },
    comments:{
        type: String,
    },
    createTime:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Order",OrderSchema);

