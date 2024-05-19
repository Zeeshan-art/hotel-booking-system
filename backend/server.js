const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");


const app = express();
dotenv.config();
app.use(express.json());

//Database Connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
