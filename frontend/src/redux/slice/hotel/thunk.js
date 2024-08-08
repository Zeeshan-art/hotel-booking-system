import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchHotel = createAsyncThunk(
  "hotels/search",
  async (body, { rejecWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/hotels/search?${body}`
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.response;
      return rejecWithValue(errorMessage);
    }
  }
);
export const getHotelById = createAsyncThunk(
  "hotels/getHotelById",
  async (body, { rejecWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/hotels/${body}`
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.response;
      return rejecWithValue(errorMessage);
    }
  }
);
