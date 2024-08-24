const mongoose = require("mongoose");
const Hotel = require("../models/hotel");

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all hotels that have at least one booking by the specified user
    const hotels = await Hotel.find({
      "bookings.userId": userId,
    });

    if (!hotels.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Extract bookings for the specific user from the hotels
    const userBookings = hotels.flatMap(hotel => 
      hotel.bookings.filter(booking => booking.userId === userId).map(booking => ({
        hotelName: hotel.name,
        hotelCity: hotel.city,
        hotelCountry: hotel.country,
        imageUrls: hotel.imageUrls,
        ...booking.toObject(), // include all booking fields
      }))
    );

    return res.status(200).json({bookings: userBookings});

  } catch (error) {
    console.error("Error retrieving user bookings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserBookings };
