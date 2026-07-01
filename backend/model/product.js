const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["Vegetables", "Fruits", "Dairy", "Grains", "Herbs", "Preserved"],
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    image: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;