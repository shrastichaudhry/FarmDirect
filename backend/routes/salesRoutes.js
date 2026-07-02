const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    getRevenue,
    getMonthlySales,
    getTopSellingProducts,
    getOrderStatus,
    getAverageRatings

} = require("../controller/salesController");

// Only Farmer can view analytics

router.get(
    "/revenue",
    authMiddleware,
    roleMiddleware("farmer"),
    getRevenue
);

router.get(
    "/monthly",
    authMiddleware,
    roleMiddleware("farmer"),
    getMonthlySales
);

router.get(
    "/top-products",
    authMiddleware,
    roleMiddleware("farmer"),
    getTopSellingProducts
);

router.get(
    "/order-status",
    authMiddleware,
    roleMiddleware("farmer"),
    getOrderStatus
);

router.get(
    "/ratings",
    authMiddleware,
    roleMiddleware("farmer"),
    getAverageRatings
);

module.exports = router;