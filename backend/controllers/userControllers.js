const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json("Email already exist");
    }

    user = new User(req.body);
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

module.exports = { register };
