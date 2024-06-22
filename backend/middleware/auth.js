const jwt = require("jsonwebtoken");

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  console.log(token, "verify");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    console.log(req.user,"uzseer");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
