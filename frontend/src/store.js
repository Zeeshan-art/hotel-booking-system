import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/slice/auth/authSlice";
import myHotelSlice from "./redux/slice/my-hotel/myHotelSlice";
import hotelSlice from "./redux/slice/hotel/hotelSlice";
import bookingReducer from './redux/slice/booking/bookingSlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    myHotel: myHotelSlice,
    hotel: hotelSlice,
    booking: bookingReducer,

  },
});

export default store;
