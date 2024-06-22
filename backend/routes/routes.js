const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const hotelRoutes = require("./hotels");

router.use("/users", userRoutes);
router.use("/my-hotels", hotelRoutes);

module.exports = router;
