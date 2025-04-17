import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Generate preview when image is selected
  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);

      // Clean up object URL when component unmounts
      return () => URL.revokeObjectURL(preview);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block mb-1 font-medium">Profile Image</label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {!image ? (
          <button
            onClick={onChooseFile}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            title="Upload Profile Photo"
          >
            <LuUpload className="text-xl" />
          </button>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-20 w-20 rounded-full object-cover border"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
              title="Remove"
            >
              <LuTrash className="text-sm text-red-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
