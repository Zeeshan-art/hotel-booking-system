import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchHotel = createAsyncThunk(
  "hotels/fetch",
  async (body, {  rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hotels/search?${body}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      return rejectWithValue(errorMessage);
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
export const createPaymentIntent = createAsyncThunk(
  "hotels/createPaymentIntent",
  async ({ hotelId, numberOfNights }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
        { numberOfNights },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
export const createHotelBooking = createAsyncThunk(
  "hotels/createHotelBooking",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/hotels/${body.hotelId}/bookings`,
        body,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
