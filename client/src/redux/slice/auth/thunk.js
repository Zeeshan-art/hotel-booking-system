import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "users/register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/register`,
        body,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);
export const login = createAsyncThunk(
  "users/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,
        body,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);
export const logout = createAsyncThunk(
  "users/logout",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/logout`,
        body,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data;
      return rejectWithValue(errorMessage);
    }
  }
);
