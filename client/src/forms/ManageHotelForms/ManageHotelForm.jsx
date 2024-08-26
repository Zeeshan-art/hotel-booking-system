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
    console.log(data,'dat....');
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount); // Corrected from data.name to data.adultCount
    formData.append("childCount", data.childCount);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("starRating", data.starRating);

    // Append facilities
    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    if(data.imageUrls){
      data.imageUrls.forEach((facility, index) => {
        console.log(facility,'faciltidfuas');
        formData.append(`imageUrls[${index}]`, facility);
      });
    }

    // Append images
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
            className="bg-blue-600 py-1 px-2 text-white hover:bg-blue-500 text-xl font-semibold"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
