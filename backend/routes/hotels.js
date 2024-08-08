const express = require("express");
const { search, getHotelById } = require("../controllers/hotelControllers");
const router = express.Router();
router.get("/search", search);
router.get("/:id", getHotelById);
module.exports = router;
