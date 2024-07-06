import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHotelById, editHotels } from "../redux/slice/hotel/thunk";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { myHotelsDetail, isLoading } = useSelector((state) => state.hotel);
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
