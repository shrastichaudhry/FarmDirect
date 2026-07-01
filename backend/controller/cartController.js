const Cart = require("../model/cart");
const Product = require("../model/product");

//Add product to cart
const addToCart = async(req, res)=> {
    try{
        const {user, product, quantity} = req.body;

        if(!user||!product||!quantity){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const productData = await Product.findById(product);

        if(!productData){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({user});
        if(!cart){
            cart = new Cart({
                user,
                items: [],
                totalAmount: 0,
            });
        }
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === product
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product,
                quantity,
                price: productData.price
            });
        }

        cart.totalAmount = cart.items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: cart
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get Cart
const getCart = async (req, res)=> {
    try{
        const cart = await Cart.findOne({
            user: req.params.userId
        }).populate("items.product");

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "cart is empty"
            });
        }

        return res.status(200).json({
            success: true,
            data: cart
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//update Quantity
const updateQuantity = async (req, res)=> {
    try{
        const { user, product, quantity}= req.body;

        const cart = await Cart.findOne({ user });

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === product
        );

        if(!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        cart.totalAmount = cart.items.reduce(
            (total, item) => total + item.quantity*item.price,
            0
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            data: cart
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Remove product
const removeFromCart = async (req, res) => {

    try {

        const { user, product } = req.body;

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== product
        );

        cart.totalAmount = cart.items.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            data: cart
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//Clear cart
const clearCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.params.userId
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];
        cart.totalAmount = 0;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart
};
