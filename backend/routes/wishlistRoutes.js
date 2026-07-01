const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require("../controller/wishlistController");

router.post("/add", authMiddleware, addToWishlist);

router.get("/:userId", authMiddleware, getWishlist);

router.delete("/remove", authMiddleware, removeFromWishlist);

module.exports = router;