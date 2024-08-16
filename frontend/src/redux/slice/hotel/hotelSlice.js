import { toast } from "react-toastify";
import { createHotelBooking, createPaymentIntent, getHotelById, searchHotel } from "./thunk";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: {
    data: [],
    pagination: {
      total: 0,
      pageNumber: 1,
      pages: 1,
    },
  },
  data: [],
  isLoading: false,
  isBookingSuccess: false,
  message: null,
  paymentIntentData: null,
  booking: []

};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchHotel.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchHotel.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addCase(searchHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.data;
      })
      .addCase(getHotelById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createPaymentIntent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload,"action");
        
        state.paymentIntentData = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createHotelBooking.pending, (state) => {
        state.isBookingSuccess = true;
      })
      .addCase(createHotelBooking.fulfilled, (state, action) => {
        state.isBookingSuccess = false;
        const {message, booking} = action.payload
        state.booking = booking
        state.message = message
        toast.success(message) // Set isBookingSuccess to false
        // state.paymentIntent = action.payload.data (commented out, as it's not in use)
      })
      .addCase(createHotelBooking.rejected, (state,action) => {
        const {message} = action.payload
        state.isBookingSuccess = false;
        state.message = message
        
        toast.error(message)
      });
  },
});

export default hotelSlice.reducer;
