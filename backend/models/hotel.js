const mongoose = require("mongoose");

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
    type: [String], // Change this to an array of strings
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number, // Change this to a number
    required: true,
    min: 1,
    max: 5,
  },
  imageUrls: {
    type: [String], // Change this to an array of strings
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
