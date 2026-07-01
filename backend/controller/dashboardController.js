const Product = require("../model/product");
const Order = require("../model/order");
const Cart = require("../model/cart");
const Wishlist = require("../model/wishlist");

// Farmer Dashboard
const farmerDashboard = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const deliveredOrders = await Order.countDocuments({
            status: "Delivered"
        });

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalOrders,
                pendingOrders,
                deliveredOrders
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Consumer Dashboard
const consumerDashboard = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        });

        const wishlist = await Wishlist.findOne({
            user: req.user.id
        });

        const orders = await Order.countDocuments({
            user: req.user.id
        });

        res.status(200).json({

            success: true,

            data: {

                cartItems: cart ? cart.items.length : 0,

                wishlistItems: wishlist ? wishlist.products.length : 0,

                totalOrders: orders

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    farmerDashboard,
    consumerDashboard

};