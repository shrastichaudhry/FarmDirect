const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

//const mongoose = require('mongoose');
const cors = require('cors');
//const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
//const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const adminRoutes = require("./routes/adminRoutes");

const salesRoutes = require("./routes/salesRoutes");
//dotenv.config();

connectDB();


const app = express();

app.use(cors());
app.use(express.json());

//Routes 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
//app.use("/api/payment", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sales", salesRoutes);

//Home Routes
app.get('/', (req,res)=>{
    res.send("Backend running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});