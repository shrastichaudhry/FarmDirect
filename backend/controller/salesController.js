const Order = require("../model/order");
const Review = require("../model/review");

// ===============================
// Total Revenue
// ===============================
const getRevenue = async (req, res) => {
    try {

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
            totalRevenue: revenue.length ? revenue[0].totalRevenue : 0
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===============================
// Monthly Sales
// ===============================
const getMonthlySales = async (req, res) => {

    try {

        const sales = await Order.aggregate([

            {
                $match: {
                    status: "Delivered"
                }
            },

            {
                $group: {

                    _id: {
                        month: {
                            $month: "$createdAt"
                        }
                    },

                    revenue: {
                        $sum: "$totalAmount"
                    },

                    orders: {
                        $sum: 1
                    }

                }
            },

            {
                $sort: {
                    "_id.month": 1
                }
            }

        ]);

        res.status(200).json({
            success: true,
            data: sales
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Top Selling Products
// ===============================
const getTopSellingProducts = async (req, res) => {

    try {

        const topProducts = await Order.aggregate([

            {
                $unwind: "$items"
            },

            {
                $group: {

                    _id: "$items.product",

                    totalSold: {
                        $sum: "$items.quantity"
                    }

                }
            },

            {
                $sort: {
                    totalSold: -1
                }
            },

            {
                $limit: 5
            },

            {
                $lookup: {

                    from: "products",

                    localField: "_id",

                    foreignField: "_id",

                    as: "product"

                }

            },

            {
                $unwind: "$product"
            },

            {
                $project: {

                    _id: 0,

                    productName: "$product.name",

                    totalSold: 1

                }

            }

        ]);

        res.status(200).json({
            success: true,
            data: topProducts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Order Status Analytics
// ===============================
const getOrderStatus = async (req, res) => {

    try {

        const status = await Order.aggregate([

            {
                $group: {

                    _id: "$status",

                    count: {
                        $sum: 1
                    }

                }

            }

        ]);

        res.status(200).json({
            success: true,
            data: status
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Average Ratings
// ===============================
const getAverageRatings = async (req, res) => {

    try {

        const ratings = await Review.aggregate([

            {
                $group: {

                    _id: "$product",

                    averageRating: {
                        $avg: "$rating"
                    }

                }

            },

            {
                $lookup: {

                    from: "products",

                    localField: "_id",

                    foreignField: "_id",

                    as: "product"

                }

            },

            {
                $unwind: "$product"
            },

            {
                $project: {

                    _id: 0,

                    productName: "$product.name",

                    averageRating: {
                        $round: ["$averageRating", 1]
                    }

                }

            }

        ]);

        res.status(200).json({
            success: true,
            data: ratings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    getRevenue,
    getMonthlySales,
    getTopSellingProducts,
    getOrderStatus,
    getAverageRatings

};