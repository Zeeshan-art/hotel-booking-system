import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { editHotels, getHotelById } from "../redux/slice/my-hotel/thunk";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { myHotelsDetail, isLoading } = useSelector((state) => state.myHotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotelById(hotelId));
  }, [dispatch, hotelId]);

  const handleSave = (formData) => {;
    dispatch(editHotels({ hotelId, body: formData }));
  };

  return (
    <ManageHotelForm
      hotel={myHotelsDetail[0]}
      isLoading={isLoading}
      onSave={handleSave}
    />
  );
};

export default EditHotel;
