/* eslint-disable react/prop-types */
import { openUploadWidget } from "../../utils/CloudinaryService";

const ImageUpload = (props) => {
  const uploadImageWidget = () => {
    console.log(props);
    let myUploadWidget = openUploadWidget({
      cloudName: props.cloud_name,
      uploadPreset: props.upload_preset,
      multiple: false,
      tags: ["user_image"],
      sources: ["local", "camera"],
      cropping: true,
      croppingAspectRatio: 1,
      maxFileSize: 5000000,
      clientAllowedFormats: ["png", "jpeg", "jpg"],
      styles: {
        palette: {
          window: "#e6e6fa",
          windowBorder: "#90A0B3",
          tabIcon: "#4f46e5",
          menuIcons: "#6b7280",
          textDark: "#111827",
          textLight: "#e6e6fa",
          link: "#4f46e5",
          action: "#4f46e5",
          inactiveTabIcon: "#6366f1",
          error: "#f70505",
          inProgress: "#4b0082",
          complete: "#176921",
          sourceBg: "#E4EBF1",
        },
        fonts: {
          "'Cute Font', cursive":
            "https://fonts.googleapis.com/css?family=Cute+Font",
        },
      },
      function(error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      },
    });
    myUploadWidget.open();
  };

  return (
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={uploadImageWidget}
    >
      Update Image
    </button>
  );
};

export default ImageUpload;
