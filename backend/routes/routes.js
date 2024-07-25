const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const myHotelRoutes = require("./myhotels");
const hotelRoutes = require("./hotels");

router.use("/users", userRoutes);
router.use("/my-hotels", myHotelRoutes);
router.use("/hotels", hotelRoutes);

module.exports = router;
