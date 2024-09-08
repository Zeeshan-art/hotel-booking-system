const Hotel = require("../models/hotel");
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_API_KEY)

const search = async (req, res) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ?? 1);
    const skip = (pageNumber - 1) * pageSize;

    console.log(req.query, 'req.query');
    
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
      filters.city = req.query.destination;
    }
    if (req.query.adultCount) {
      filters.adultCount = { $gte: req.query.adultCount };
    }
    if (req.query.childCount) {
      filters.childCount = { $gte: req.query.childCount };
    }
    if (req.query.maxPrice) {
      filters.pricePerNight = { $lte: parseInt(req.query.maxPrice) };
    }

    let sortOption = {};
    if (req.query.sort) {
      if (req.query.sort === "pricePerNight_asc") {
        sortOption = { pricePerNight: 1 };
      } else if (req.query.sort === "pricePerNight_desc") {
        sortOption = { pricePerNight: -1 };
      }
    }

    // Optional: Consider adding indexes to frequently filtered fields like `starRating`, `type`, `facilities`, `city`, `pricePerNight` for better performance.

    const hotels = await Hotel.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ data: [] });
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
    console.error("Error occurred during hotel search:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid query parameters provided." });
    } else {
      res.status(500).json({ message: "An error occurred while processing your request." });
    }
  }
};



const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById({ _id: id });
    if (!hotel || hotel.length === 0) {
      return res.status(404).json({ message: "Hotel Not Found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const hotelBookingPaymentIntent = async (req, res) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel || hotel.length === 0) {
      return res.status(404).json({ message: "Hotel Not Found" });
    }   
    const totalCost = hotel.pricePerNight * parseInt(numberOfNights);
    if (isNaN(totalCost)) {
      return res.status(400).json({ message: "Invalid booking details" });
  }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'pkr',
      metadata: {
        hotelId,
        userId: req.user.userId
      }
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }
    const data = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost
    };
    return res.status(201).json({ data: data});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const hotelBooking = async(req,res)=>{
try {
  const {paymentIntentId} = req.body
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  if(!paymentIntent){
    return res.status(404).json({message: 'payment intent not found'})
  }

  if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.user.userId){
    return res.status(400).json({message: 'payment intent mismatch'})
  }
  if(paymentIntent.status!=='succeeded'){
    return res.status(400).json({
      message: `payment intent not succeeded. Status: ${paymentIntent.status}`
    })
  }
  const newBooking = {
    ...req.body, userId: req.user.userId
  }
  const hotel = await Hotel.findByIdAndUpdate({_id:req.params.hotelId},
    {$push:{bookings: newBooking}}  
  )
  if (!hotel) {
    return res.status(404).json({ message: "Hotel Not Found" });
  }

  return res.status(200).json({ booking: newBooking, message: "Booking Saved!" });
} catch (error) {
  return res.status(500).json({message:"Something went wrong"})
}
}

module.exports = { search, getHotelById, hotelBookingPaymentIntent, hotelBooking };
