const cloudinary = require("cloudinary").v2;
const Hotel = require("../models/hotel");

const addHotel = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = image.buffer.toString("base64");
      let dataUri = "data:" + image.mimetype + ";base64," + b64;
      const uploadResult = await cloudinary.uploader.upload(dataUri);
      return uploadResult.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.user.userId; 
    newHotel.lastUpdate = new Date();

    const data = new Hotel(newHotel);
    await data.save();

    return res.status(201).json({ message: "Creation Successful", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
const getMyHotels = async (req, res) => {
  try {
    const userId = req.user.userId
    const getDetails = await Hotel.find({userId: userId});
    if (!getDetails) {
      return res.status(404).json({ message: "No Hotel Found" });
    }
    return res.status(200).json({ data: getDetails });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getMyHotelsById = async (req, res) => {
  try {
    const id = req.params.hotelId;
    const hotel = await Hotel.find({ _id: id, userId: req.user.userId });
    if (!hotel) {
      return res.status(404).json({ message: "No Hotel Found" });
    }
    return res.status(200).json({ data: hotel });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const editMyHotels = async (req, res) => {
  try {
    const id = req.params.hotelId;
    const imageFiles = req?.files;
    const updatedHotel = req.body;
    updatedHotel.userId = req.user.userId;
    updatedHotel.lastUpdate = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      updatedHotel,
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "No Hotel Found" });
    }
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = image.buffer.toString("base64");
      let dataUri = "data:" + image.mimetype + ";base64," + b64;
      const uploadResult = await cloudinary.uploader.upload(dataUri);
      return uploadResult.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    hotel.imageUrls = [...imageUrls, ...(updatedHotel?.imageUrls || [])];
    await hotel.save();
    return res.status(201).json({ message: "Edit Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { addHotel, getMyHotels, editMyHotels, getMyHotelsById };
