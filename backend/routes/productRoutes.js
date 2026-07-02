const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getProductCount,
    getLatestProducts
} = require("../controller/productController");

router.post("/", authMiddleware, roleMiddleware("farmer"), upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.get("/categories/all", getCategories);

router.get("/count/all", getProductCount);

router.get("/latest/all", getLatestProducts);
router.put("/:id",authMiddleware, roleMiddleware("farmer", "admin"), updateProduct);
router.delete("/:id",authMiddleware, roleMiddleware("farmer", "admin"), deleteProduct);

module.exports = router;