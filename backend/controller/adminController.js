const User = require("../model/users");
const Product = require("../model/product");
const Order = require("../model/order");

// Get All Users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Admin Dashboard Analytics
const getAdminAnalytics = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalFarmers = await User.countDocuments({
            role: "farmer"
        });

        const totalConsumers = await User.countDocuments({
            role: "consumer"
        });

        const totalAdmins = await User.countDocuments({
            role: "admin"
        });

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const deliveredOrders = await Order.countDocuments({
            status: "Delivered"
        });

        // Revenue from delivered orders only
        const revenue = await Order.aggregate([
            {
                $match: {
                    status: "Delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalAdmins,
                totalFarmers,
                totalConsumers,
                totalProducts,
                totalOrders,
                pendingOrders,
                deliveredOrders,
                totalRevenue: revenue.length ? revenue[0].totalRevenue : 0
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
    getAllUsers,
    deleteUser,
    getAllProducts,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getAdminAnalytics
};