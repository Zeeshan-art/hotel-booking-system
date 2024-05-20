const User = require("../models/user");

const register = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      res.send("Email already exist");
    }
  } catch (error) {}
};

module.exports = { register };
