import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/slice/auth/authSlice";
import myHotelSlice from "./redux/slice/my-hotel/myHotelSlice";
import hotelSlice from "./redux/slice/hotel/hotelSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    myHotel: myHotelSlice,
    hotel: hotelSlice
  },
});

export default store;
