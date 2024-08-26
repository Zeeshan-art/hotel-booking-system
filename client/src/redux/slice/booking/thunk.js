import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const myBookings = createAsyncThunk(
    "bookings/my-bookings",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/bookings/my-bookings`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        return rejectWithValue(errorMessage);
      }
    }
  );
    