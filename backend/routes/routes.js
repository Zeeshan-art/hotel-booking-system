const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const myHotelRoutes = require("./myhotels");
const hotelRoutes = require("./hotels");
const bookingRoutes = require("./bookings");

router.use("/users", userRoutes);
router.use("/my-hotels", myHotelRoutes);
router.use("/hotels", hotelRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
