// redux/slice/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addHotel, editHotels, getHotelById, myHotels } from "./thunk";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  myHotelsDetail: [],
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
        const { message } = action.payload;
        state.isLoading = false;
        toast.success(message);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(myHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myHotels.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.myHotelsDetail = data;
        state.isLoading = false;
      })
      .addCase(myHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(getHotelById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.myHotelsDetail = data;
        state.isLoading = false;
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(editHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editHotels.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(editHotels.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.message);
      });
  },
});

export default hotelSlice.reducer;
