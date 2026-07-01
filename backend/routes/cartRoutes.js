const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart
} = require("../controller/cartController");

router.post("/add", authMiddleware, addToCart);

router.get("/:userId", authMiddleware, getCart);

router.put("/update", authMiddleware, updateQuantity);

router.delete("/remove", authMiddleware, removeFromCart);

router.delete("/clear/:userId", authMiddleware, clearCart);

module.exports = router;