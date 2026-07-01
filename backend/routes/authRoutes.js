const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
    createAuth,
    loginUser,
    getProfile,
    updateProfile
} = require("../controller/authController");

router.post("/register", createAuth);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

module.exports = router;