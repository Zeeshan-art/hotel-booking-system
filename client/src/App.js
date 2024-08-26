import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useSelector } from "react-redux";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";
import Search from "./components/Search";
import HotelDetail from "./pages/HotelDetail";
import BookingHotel from "./pages/BookingHotel";
import BookingComplete from "./components/BookingComplete";
import MyBooking from "./pages/MyBooking";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/hotel-detail/:hotelId"
          element={
            <Layout>
              <HotelDetail />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotels"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBooking />
                </Layout>
              }
            />
            
            <Route
              path="/complete"
              element={
                <Layout>
                  <BookingComplete />
                </Layout>
              }
            />

            <Route
              path="/:hotelId/booking"
              element={
                <Layout>
                  <BookingHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotels/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
