const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    razorpayOrderId: {
        type: String,
        required: true
    },

    razorpayPaymentId: {
        type: String,
        default: ""
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);