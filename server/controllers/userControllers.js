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
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: "1d",
    // });
    // res.cookie("auth_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 86400000,
    // });
    return res.status(200).send({ message: "user register successfully" });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req?.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credential");
    }
    const token = jwt.sign(
      { userId: user._id, user: user },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    const data = {
      userId: user._id,
      user: user,
      token: token,
      message: "login successful",
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("auth_token", "", { expires: new Date(0) });
    return res.status(200).send({ message: "logout successfull" });
  } catch (error) {
    return res.status(500).send({ message: "something went wrong" });
  }
};
const checkTokenValidity = async (req, res) => {
  res.status(200).send({ user: req.user });
};

module.exports = { register, login, checkTokenValidity, logout };
