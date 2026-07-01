const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    deleteUser,
    getAllProducts,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getAdminAnalytics
} = require("../controller/adminController");

// Apply authentication and admin authorization to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/dashboard", getAdminAnalytics);

// User Management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Product Management
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);

// Order Management
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

module.exports = router;