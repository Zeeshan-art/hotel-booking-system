import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addHotel = createAsyncThunk(
  "my-hotels/addHotel",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/my-hotels/`,
        body,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("err", error);
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);
