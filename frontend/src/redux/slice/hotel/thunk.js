import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const getAuthToken = () => {
  return Cookies.get("auth_token");
};

export const addHotel = createAsyncThunk(
  "my-hotels/addHotel",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/my-hotels/`,
        body,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Include JWT token here
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("err", error);
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const myHotels = createAsyncThunk(
  "my-hotels/myHotels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/my-hotels/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Include JWT token here
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("err", error);
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getHotelById = createAsyncThunk(
  "my-hotels/hotelById",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/my-hotels/${hotelId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Include JWT token here
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const editHotels = createAsyncThunk(
  "my-hotels/editHotel",
  async ({ hotelId, body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/my-hotels/${hotelId}`,
        body,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Include JWT token here
          },
        }
      );
      console.log(response, "res");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);

