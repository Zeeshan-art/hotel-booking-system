const cloudinary = require("cloudinary").v2;
const Hotel = require("../models/hotel"); // Make sure to require your Hotel model correctly

const addHotel = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;

    // Upload Images to Cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = image.buffer.toString("base64");
      let dataUri = "data:" + image.mimetype + ";base64," + b64;
      const uploadResult = await cloudinary.uploader.upload(dataUri);
      return uploadResult.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.user.userId; // Ensure that `req.userId` is correctly set
    newHotel.lastUpdate = new Date();

    const data = new Hotel(newHotel);
    await data.save();

    res.status(201).json({ message: "Creation Successful", data: data });
  } catch (error) {
    console.log("Error Creating hotel: ", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { addHotel };
