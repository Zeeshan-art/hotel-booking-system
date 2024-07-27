const Hotel = require("../models/hotel");

const search = async (req, res) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page : 1);
    const skip = (pageNumber - 1) * pageSize;

    const filters = {};
    if (req.query.stars) {
      filters.starRating = { $in: req.query.stars.split(",") };
    }
    if (req.query.types) {
      filters.type = { $in: req.query.types.split(",") };
    }
    if (req.query.facilities) {
      filters.facilities = { $all: req.query.facilities.split(",") };
    }
    if (req.query.destination) {
      console.log('city', req.query.destination);
      filters.city = req.query.destination;
    }
    if (req.query.adultCount) {
      filters.adultCount = { $gte: parseInt(req.query.adultCount) };
    }
    if (req.query.childCount) {
      filters.childCount = { $gte: parseInt(req.query.childCount) };
    }

    const hotels = await Hotel.find(filters).skip(skip).limit(pageSize);

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "Hotels Not Found" });
    }

    const total = await Hotel.countDocuments(filters);
    const data = {
      data: hotels,
      pagination: {
        total,
        pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { search };
