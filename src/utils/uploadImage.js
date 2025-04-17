const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Ensure the image URL uses HTTPS
    const imageUrl = response.data.imageUrl.replace("http://", "https://");
    return { ...response.data, imageUrl };
  } catch (error) {
    console.log("error uploading the image", error);
    throw error;
  }
};
