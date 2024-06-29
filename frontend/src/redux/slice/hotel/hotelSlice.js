// redux/slice/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addHotel } from "./thunk";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  message: null,
  isLoading: false,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        const {  message } = action.payload;
        state.isLoading = false;
        toast.success(message);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export default hotelSlice.reducer;
