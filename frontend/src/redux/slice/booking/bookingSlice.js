import { createSlice } from '@reduxjs/toolkit';
import { myBookings } from './thunk';
import { toast } from "react-toastify";
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkIn: null,
    checkOut: null,
    adultCount: 1,
    childCount: 0,
    isLoading: false,
    bookings: []
  },
  reducers: {
    setBookingDetails: (state, action) => {
      const { checkIn, checkOut, adultCount, childCount } = action.payload;

      // Ensure checkIn and checkOut are Dates before converting to ISO strings
      state.checkIn = checkIn ? (checkIn instanceof Date ? checkIn.toISOString() : checkIn) : null;
      state.checkOut = checkOut ? (checkOut instanceof Date ? checkOut.toISOString() : checkOut) : null;
      state.adultCount = adultCount;
      state.childCount = childCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myBookings.fulfilled, (state, action) => {
        const { bookings } = action.payload;
        state.bookings = bookings;
        state.isLoading = false;
        //toast.success(message);
      })
      .addCase(myBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.bookings = []
        
      })}

});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
