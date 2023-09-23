/* eslint-disable react/prop-types */
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreviewButtons from "./ImagePreviewButtons";
import { Cloudinary } from "@cloudinary/url-gen";
import { useSelector } from "react-redux";
import { AdvancedImage, lazyload } from "@cloudinary/react";

const ImageInput = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const [imagesUploadedList, setImagesUploadedList] = useState([]);
  const [resultInfo, setResultInfo] = useState({
    imageId: "",
    secureUrl: "",
    userId: userInfo._id,
  });

  const cld = new Cloudinary({
    cloud: {
      cloud_name: "goalcrushers",
      upload_preset: "goal_crushers_presets",
    },
  });

  const onImageUploadHandler = (res) => {
    setImagesUploadedList((prevState) => [...prevState, res.publicId]);
    setResultInfo({
      imageId: res.publicId,
      secureUrl: res.secureUrl,
      userId: res.userId,
      strResult: res.strResult,
    });
  };
  /* Preview Image */
  let previewImageUrl;
  let content;
  const RenderImagePreview = (url) => {
    return (
      <div className="preview-image flex flex-col justify-center items-center">
        <AdvancedImage cldImg={url} plugins={[lazyload()]} />
      </div>
    );
  };

  if (imagesUploadedList.length === 0) {
    content = (
      <div className="preview-image flex flex-col justify-center items-center">
        <p>No photos were added yet.</p>
      </div>
    );
  } else if (imagesUploadedList.length >= 1) {
    previewImageUrl = cld.image(imagesUploadedList[0]);
    document.getElementById("preview-image-buttons").classList.remove("hidden");
    document.getElementById("preview-image-buttons").classList.add("flex");
    content = (
      <>
        <RenderImagePreview
          key={`{preview-${resultInfo?.imageId}`}
          publicId={resultInfo?.imageId}
          url={previewImageUrl}
        />
        <div
          id="preview-image-buttons"
          className="hidden flex-col justify-around items-center"
        >
          <ImagePreviewButtons
            key={`{preview-buttons-${resultInfo?.imageId}`}
            publicId={resultInfo?.imageId}
            url={previewImageUrl}
            userId={userId}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <table className="col-span-1">
        <tbody>
          <tr className="mt-2">
            <td className="flex card p-5 md:px-5 md:pb-0 md:pt-5 items-start">
              <section className="flex min-h-full flex-1 flex-col px-6 py-6">
                <div className="mx-auto w-full sm:max-w-sm">
                  <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update User Image
                  </h2>
                </div>
                <div className="mt-2 mx-auto w-full sm:max-w-sm">
                  <p className="my-2 block w-full text-sm p-1 text-center text-gray-900 resize-none sm:leading-6">
                    Choose your user image.
                    <br />
                    Keep it classy, please.
                  </p>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <ImageUpload
                    cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                    upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
                    onImageUpload={(res) => onImageUploadHandler(res)}
                    userId={userId}
                  />
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  {content}
                </div>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ImageInput;
