const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// required information for snack
var SnackSchema = new Schema({
    snackName:{
        type: String,
        required: true,
    },
    snackPrice:{
        type: Number,
        required: true,
    },
    snackDescription:{
        type: String,
        required: true,
    },

    // enter the photo path as Stirng to upload
    snackPhotoPath:{
        type: String,
        required: true,
    },
    isValidNow:{
        type: Boolean,
        default: true
    },
    createTime:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Snack",SnackSchema);