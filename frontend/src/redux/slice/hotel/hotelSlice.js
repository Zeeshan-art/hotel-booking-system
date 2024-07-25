import { searchHotel } from "./thunk";

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
        console.log(action.payload, "action");
        state.searchResult = action.payload;
      })
      .addCase(searchHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.data;
      });
  },
});

export default hotelSlice.reducer;
