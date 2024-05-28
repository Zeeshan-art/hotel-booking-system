const express = require("express");
const { register, login } = require("../controllers/userControllers");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "firstname is required").isString(),
    check("lastName", "lastname is required").isString(),
    check("email", "email is required").isEmail(),
    check(
      "password",
      "password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  register
);
router.post("/login", login);
module.exports = router;
