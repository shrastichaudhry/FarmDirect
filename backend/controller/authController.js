// const { create } = require("../model/order");
const auth = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Post API
// Register user
const createAuth = async(req, res)=> {
    try {
        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email sahi nahi hai."
            });
        }

        const existingUser = await auth.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                status: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuth = new auth({
            name, 
            email, 
            password: hashedPassword,
            role
        });

        await newAuth.save();

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: newAuth,
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login user
const loginUser = async (req, res)=> {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await auth.findOne({ email });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,

            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
};
return res.status(200).json({
    success: true,
    message: "Login successfully",
    token,
    user: userData
});
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try {

        const user = await auth.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Profile
const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await auth.findByIdAndUpdate(
            req.user.id,
            {
                name,
                email
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile Updated",
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = { createAuth, loginUser, getProfile, updateProfile};