const mongoose = require("mongoose");

// Define the Booking Schema
const BookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  }
});

// Define the Hotel Schema
const HotelSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String], // Array of strings
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number, // A number from 1 to 5
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: {
    type: [String], // Array of strings
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
  bookings: [BookingSchema]
});

// Adding indexes to the HotelSchema

HotelSchema.index({ type: 1 }, { background: true });
HotelSchema.index({ facilities: 1 }, { background: true });
HotelSchema.index({ pricePerNight: 1 }, { background: true });
HotelSchema.index({ starRating: 1 }, { background: true });

module.exports = mongoose.model("Hotel", HotelSchema);
