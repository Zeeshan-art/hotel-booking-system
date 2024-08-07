const cloudinary = require("cloudinary").v2; // Use cloudinary.v2 for the latest version

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
};

module.exports = cloudinaryConfig;
