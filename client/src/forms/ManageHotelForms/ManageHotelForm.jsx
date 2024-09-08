import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DetailSection from "./DetailSection";
import HotelTypeSection from "./HotelTypeSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

const ManageHotelForm = ({ onSave, isLoading, hotel }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount); 
    formData.append("childCount", data.childCount);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("starRating", data.starRating);

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    if(data.imageUrls){
      data.imageUrls.forEach((facility, index) => {
        formData.append(`imageUrls[${index}]`, facility);
      });
    }
    Array.from(data.imageFiles).forEach((file, index) => {
      formData.append("imageFiles", file);
    });
    onSave(formData);
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <HotelTypeSection />
        <HotelFacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-800 hover:bg-indigo-600 py-1 px-2 text-white text-xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
