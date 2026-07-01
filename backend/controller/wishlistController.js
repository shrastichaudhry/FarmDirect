const Wishlist = require("../model/wishlist");
const Product = require("../model/product");

//Add product to wishlist
const addToWishlist = async (req, res) => {

    try {

        const { user, product } = req.body;

        if (!user || !product) {
            return res.status(400).json({
                success: false,
                message: "User and Product are required"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let wishlist = await Wishlist.findOne({ user });

        if (!wishlist) {

            wishlist = new Wishlist({
                user,
                products: []
            });

        }

        if (
          wishlist.products.some(
            item => item.toString() === product
           )
        ) {

            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });

        }

        wishlist.products.push(product);

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            data: wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//get wishlist
const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findOne({
            user: req.params.userId
        }).populate("products");

        if (!wishlist) {

            return res.status(404).json({
                success: false,
                message: "Wishlist is empty"
            });

        }

        res.status(200).json({
            success: true,
            data: wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Remove from wishlist
const removeFromWishlist = async (req, res) => {

    try {

        const { user, product } = req.body;

        const wishlist = await Wishlist.findOne({ user });

        if (!wishlist) {

            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });

        }

        wishlist.products = wishlist.products.filter(
            item => item.toString() !== product
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};