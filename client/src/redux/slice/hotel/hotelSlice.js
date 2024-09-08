import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createHotelBooking, createPaymentIntent, getHotelById, searchHotel } from "./thunk";

const initialState = {
  filters: {},
  searchParams: {},
  data: [],
  pagination: {},
  isLoading: false,
  isBookingSuccess: false,
  message: null,
  paymentIntentData: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      console.log('Updating filters:', action.payload);
      state.filters = action.payload;
    },
    updateSearchParams: (state, action) => {
      console.log('Updating search params:', action.payload);
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.pagination = {};
        state.message = action.payload || "Failed to fetch hotels";
        //toast.error(state.message);
      })
      .addCase(getHotelById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [action.payload]; // Assuming you're fetching a single hotel
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "Failed to fetch hotel details";
        // toast.error(state.message);
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentIntentData = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "Failed to create payment intent";
        // toast.error(state.message);
      })
      .addCase(createHotelBooking.pending, (state) => {
        state.isBookingSuccess = true;
      })
      .addCase(createHotelBooking.fulfilled, (state, action) => {
        state.isBookingSuccess = false;
        const { message, booking } = action.payload;
        state.booking = booking;
        state.message = message;
        toast.success(message);
      })
      .addCase(createHotelBooking.rejected, (state, action) => {
        state.isBookingSuccess = false;
        state.message = action.payload || "Failed to create booking";
        // toast.error(state.message);
      });
  },
});

export const { updateFilters, updateSearchParams } = hotelSlice.actions;
export default hotelSlice.reducer;
