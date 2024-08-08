import { getHotelById, searchHotel } from "./thunk";

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
  message: null,
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
      });
  },
});

export default hotelSlice.reducer;
