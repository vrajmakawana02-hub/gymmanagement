const mongoose = require("mongoose")


const memberSchema = mongoose.Schema({

    name: {
        type: String,
        requried: true,
    },
    mobileNo: {
        type: String,

    },
    address: {
        type: String,

    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'membership',
        requried: true
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        requried: true
    },
    profilePic: {
        type: String,
        requried: true,
    },

    status: {
        type: String,
        default: "Active"
    },
    lastPayment: {
        type: Date,
        default: new Date(),
    },
    nextBillDate: {
        type: Date,
        requried: true,
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },


}, { timestamps: true })

const memberModal = mongoose.model("member", memberSchema);

module.exports = memberModal;