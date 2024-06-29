import React from "react";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <div className="border rounded p-4 gap-4 flex flex-col">
        <input
          type="file"
          accept="image/*"
          multiple
          className="text-gray-700 w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalImages = imageFiles.length;
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
