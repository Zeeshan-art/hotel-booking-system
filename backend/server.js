const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");
const routes = require("./routes/routes");

const app = express();
dotenv.config();
app.use(express.json());

connectDB();

app.use("/api", routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
