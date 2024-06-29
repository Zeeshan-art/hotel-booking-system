// redux/slice/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, signup, logout } from "./thunk";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token") || null,
  message: null,
  isLoading: false,
  isLoggedIn: !!Cookies.get("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { token, message } = action.payload;
        state.token = token;
        state.isLoading = false;
        toast.success(message);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { message, token } = action.payload;
        state.isLoading = false;
        state.token = token;
        if (message === "login successful") {
          Cookies.set("token", token);
          state.isLoggedIn = true;
        }
        toast.success(message);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { message } = action.payload;
        Cookies.remove("token");
        toast.success(message);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export default authSlice.reducer;
