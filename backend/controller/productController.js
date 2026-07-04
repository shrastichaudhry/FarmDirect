const Product = require("../model/product");
const cloudinary = require("../config/cloudinary");
const { stack } = require("../routes/productRoutes");
//const Product = require("../model/product");

//create product
const createProduct = async (req, res) => {
    try {
        
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);

        const { name, description, price, category, stock } = req.body;
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);
        // console.log("USER:", req.user);


        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        

        if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Product image is required"
    });
}

const imageUrl = req.file.path;

        const product = await Product.create({
            farmer: req.user.id,
            name,
            description,
            price,
            category,
            stock,
            image: imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack

        });

    }
};

//Get all product
const getAllProducts = async (req, res) => {

    try {

        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page=1,
            limit=100
            
        } = req.query;

        let query = {};

        // Search by product name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price
        if (minPrice || maxPrice) {

            query.price = {};

            if (minPrice)
                query.price.$gte = Number(minPrice);

            if (maxPrice)
                query.price.$lte = Number(maxPrice);

        }

        let products = Product.find(query);

        // Sorting
        if (sort === "asc") {

            products = products.sort({
                price: 1
            });

        }

        if (sort === "desc") {

            products = products.sort({
                price: -1
            });

        }

        // Pagination
        const skip = (page - 1) * limit;

        products = products
            .skip(skip)
            .limit(Number(limit));

        const result = await products;

        return res.status(200).json({

            success: true,

            count: result.length,

            page: Number(page),

            data: result

        });

    }
    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,
            stack: error.stack

        });

    }

};

// Get Single product
const getSingleProduct = async (req, res)=> {
    try {
        const product = await Product.findById(req.params.id.trim())
                .populate("farmer", "name email");

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: product 
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

//Get Category
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");

        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

//getProductCount
const getProductCount = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        return res.status(200).json({
            success: true,
            totalProducts: count
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

//getLatestProduct
const getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

//update product
const updateProduct = async (req, res)=> {
    try {

         console.log("ID:", JSON.stringify(req.params.id));

        const product = await Product.findByIdAndUpdate(
            req.params.id.trim(),
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

//delete the product
const deleteProduct = async (req, res)=> {
    try {
        const product = await Product.findByIdAndDelete(req.params.id.trim());

        if(!product){
            return res.status(404).json({
                success: false,
                message: "product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getProductCount,
    getLatestProducts,
    
};