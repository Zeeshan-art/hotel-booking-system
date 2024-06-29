import React from "react";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "../redux/slice/hotel/thunk";

const AddHotel = () => {
  const isLoading = useSelector((state) => state.hotel.isLoading);

  const dispatch = useDispatch();
  const handleSave = (formData) => {
    console.log(formData, "formData");
    dispatch(addHotel(formData));
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
