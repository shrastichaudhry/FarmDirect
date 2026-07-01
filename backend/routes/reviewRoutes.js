const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAverageRating
} = require("../controller/reviewController");

router.post("/", authMiddleware, addReview);

router.get("/rating/:productId", getAverageRating);

router.get("/:productId", getProductReviews);

router.put("/:id", authMiddleware, updateReview);

router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;