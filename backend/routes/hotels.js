const express = require("express");
const { search, getHotelById,  hotelBookingPaymentIntent, hotelBooking } = require("../controllers/hotelControllers");
const verifyToken = require("../middleware/auth");

const router = express.Router();
router.get("/search", search);
router.get("/:id", getHotelById);
router.post('/:hotelId/bookings/payment-intent', verifyToken ,hotelBookingPaymentIntent)
router.post('/:hotelId/bookings', verifyToken, hotelBooking)

module.exports = router;
