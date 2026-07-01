const Review = require("../model/review");
const Product = require("../model/product");

//Add Review
const addReview = async (req, res) => {

    try {

        const { user, product, rating, comment } = req.body;

        if (!user || !product || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const review = await Review.create({
            user,
            product,
            rating,
            comment
        });

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: review
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Get Review of Product
const getProductReviews = async (req, res) => {

    try {

        const reviews = await Review.find({
            product: req.params.productId
        })
        .populate("user", "name")
        .populate("product", "name");

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Update Review
const updateReview = async (req, res) => {

    try {

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!review) {

            return res.status(404).json({
                success: false,
                message: "Review not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Delete Review
const deleteReview = async (req, res) => {

    try {

        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {

            return res.status(404).json({
                success: false,
                message: "Review not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Get Average rating
const getAverageRating = async (req, res) => {

    try {

        const reviews = await Review.find({
            product: req.params.productId
        });

        if (reviews.length === 0) {

            return res.status(200).json({
                success: true,
                averageRating: 0
            });

        }

        const total = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        const average = total / reviews.length;

        return res.status(200).json({
            success: true,
            averageRating: average.toFixed(1)
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAverageRating
};