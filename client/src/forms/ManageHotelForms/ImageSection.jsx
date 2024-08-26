import React from "react";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const existingUrls = watch("imageUrls");
  const handleDelete = (e, imageUrls) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingUrls.filter((url) => url !== imageUrls)
    );
    console.log("clicked");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <div className="border rounded p-4 gap-4 flex flex-col">
        {existingUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingUrls.map((url) => (
              <div className="relative group" key={url}>
                <img src={url} alt="" className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 bg-black flex items-center justify-center bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          className="text-gray-700 w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalImages =
                imageFiles.length + (existingUrls?.length || 0);
                console.log(totalImages,'totalImages');
              if (totalImages === 0) {
                return "At least one image should be added";
              }
              if (totalImages > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
        {errors.imageFiles?.message && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
