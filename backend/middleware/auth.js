const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const token = req.cookies.auth_token;
  console.log("token", token);
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
