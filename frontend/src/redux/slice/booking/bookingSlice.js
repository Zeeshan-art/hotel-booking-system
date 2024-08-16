import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkIn: null,
    checkOut: null,
    adultCount: 1,
    childCount: 0,
    isLoading: false
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

});

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
