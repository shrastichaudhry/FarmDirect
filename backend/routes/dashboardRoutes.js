const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    farmerDashboard,
    consumerDashboard

} = require("../controller/dashboardController");

router.get(
    "/farmer",
    authMiddleware,
    roleMiddleware("farmer"),
    farmerDashboard
);

router.get(
    "/consumer",
    authMiddleware,
    roleMiddleware("consumer"),
    consumerDashboard
);

module.exports = router;