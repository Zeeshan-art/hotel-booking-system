const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const routes = require("./routes/routes");
const cors = require("cors");
const cloudinaryConfig = require("./config/cloudinary.config");

const app = express();
dotenv.config();
app.use(express.json());
cloudinaryConfig();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    
    credentials: true,
  })
);
app.use(cookieParser());

connectDB();

app.use("/api", routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
