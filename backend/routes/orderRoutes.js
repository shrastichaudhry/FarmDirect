const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder
} = require("../controller/orderController");

router.post("/", authMiddleware, roleMiddleware("consumer"), createOrder);

router.get("/", authMiddleware, getAllOrders);

router.get("/:id", authMiddleware, getSingleOrder);

router.put("/:id",authMiddleware, roleMiddleware("farmer"), updateOrderStatus);

router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;