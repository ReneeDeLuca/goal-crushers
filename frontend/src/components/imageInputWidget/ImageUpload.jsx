/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const UploadWidget = (props) => {
  const cloud_name = props.cloud_name;
  const upload_preset = props.upload_preset;
  const userId = props.userId;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: cloud_name,
      uploadPreset: upload_preset,
      multiple: false,
      tags: [userId],
      sources: ["local", "camera"],
      cropping: true,
      croppingAspectRatio: 1,
      showCompletedButton: true,
      singleUploadAutoClose: false,
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
        if (result.event === "success") {
          const res = {
            publicId: result.public_id,
            secureUrl: result.secure_url,
            userId: result.tags[0],
            strResult: result.get_prep_value(), // returns a string formatted as "<resource_type>/<type>/v<version>/<public_id>.<format>" e.g. "image/upload/v123456789/test.png"
          };
          props.onImageUpload(res);
          console.log("Done! Here is the image info: ", res);
        } else if (error) {
          console.log(error);
        }
      },
    });
  });

  return (
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        widgetRef.current.open();
      }}
    >
      Update Image
    </button>
  );
};

export default UploadWidget;
