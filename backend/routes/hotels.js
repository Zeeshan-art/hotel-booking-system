const express = require("express");

const { check } = require("express-validator");
const upload = require("../middleware/multer");
const { addHotel } = require("../controllers/hotelControllers");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  [
    check("userId", "userId is required").isString(),
    check("name", "name is required").isString(),
    check("city", "city is required").isString(),
    check("country", "userId is required").isString(),
    check("description", "description  is required").isString(),
    check("type", "type is required").isString(),
    check(
      "pricePerNight",
      "pricePerNight is required and must be a number"
    ).isNumeric(),
    check("facilities", "facilities is required").isArray(),
  ],
  upload.array("photos", 6),
  addHotel
);

module.exports = router;
