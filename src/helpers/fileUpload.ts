const URL_CLOUDINARY = `https://api.cloudinary.com/v1_1/dl2r0aqnl/upload`;
export const fileUpload = async (file: FileList[0]) => {
  if (!file) throw new Error("Archive don't found");

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file, "file");

  try {
    const response = await fetch(URL_CLOUDINARY, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("The image could not be uploaded");

    const cloudinaryResp = await response.json();

    return cloudinaryResp;
  } catch (error) {
    console.log(error);
  }
};
