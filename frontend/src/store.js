import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/slice/auth/authSlice";
import hotelSlice from "./redux/slice/hotel/hotelSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel: hotelSlice,
  },
});

export default store;
