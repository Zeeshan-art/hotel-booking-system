const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, firstName, lastName, password } = req.body;
  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json("Email already exist");
    }

    user = new User({ email, firstName, lastName, password });
    await user.save();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).send({ message: "user register successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    console.log(user.password, user._id, "password");
    if (!user) {
      console.log("user");
      return res.status(400).json("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("isMatch");
      return res.status(400).json("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "something went wrong" });
  }
};

module.exports = { register, login };
