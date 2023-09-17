import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import ImagePreview from "./ImagePreview";

const ImageInputWidget = () => {
  const [imagesUploadedList, setImagesUploadedList] = useState([]);

  const cld = new Cloudinary({
    cloud: {
      cloud_name: "goalcrushers",
      upload_preset: "goal_crushers_presets",
    },
  });

  const onImageUploadHandler = (publicId) => {
    setImagesUploadedList((prevState) => [...prevState, publicId]);
  };

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
                    onImageUpload={(publicId) => onImageUploadHandler(publicId)}
                  />
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <ImagePreview
                    imagesUploaded={imagesUploadedList}
                    {...cld}
                    cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                  />
                </div>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ImageInputWidget;
