const mongoose = require("mongoose");
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
      required: true
  },
  totalCost: {
      type: Number,
      required: true
  },
  
  paymentIntentId:{
    type: String,
    required:true
  }
});

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
  bookings: [BookingSchema]
});

module.exports = mongoose.model("Hotel", HotelSchema);
