const express = require("express");
const { getUserBookings } = require("../controllers/bookingControllers");
const verifyToken = require("../middleware/auth");

const router = express.Router();
router.get("/my-bookings", verifyToken,getUserBookings);

module.exports = router;
