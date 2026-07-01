const Order = require("../model/order");

//create order
const createOrder = async (req, res)=>{
    try {
        const {user, items, totalAmount} = req.body;

        if(!user||!items||items.length===0||!totalAmount){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const order = await Order.create({
            user,
            items,
            totalAmount,
        });

        return res.status(201).json({
            success: true,
            message: "order created successful",
            data: order
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Get All order
const getAllOrders = async (req, res)=>{
    try{
        const orders = await Order.find()
                .populate("user", "name email")
                .populate("items.product", "name price image");

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single order
const getSingleOrder = async (req, res)=> {
    try{
        const order = await Order.findById(req.params.id)
               .populate("user", "name email")
               .populate("items.product", "name price image");

        if(!order){
            return res.status(404).json({
                success: false,
                message: "order not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: order
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//update the order
const updateOrderStatus = async(req, res)=> {
    try{
       const { status } = req.body;

       const order = await Order.findByIdAndUpdate(
            req.params.id,

            { status },

            {
                new: true,
                runValidators: true
            });

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Delete the order
const deleteOrder = async(req, res)=> {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
       createOrder,
       getAllOrders,
       getSingleOrder,
       updateOrderStatus,
       deleteOrder
};