/* eslint-disable react/prop-types */
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  useDeleteUserImageMutation,
  useUpdateUserImageMutation,
} from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserImagePreview = (props) => {
  //variables
  const cld = new Cloudinary({
    cloud: {
      cloudName: props.cloudName,
    },
  });
  const imageId = props.publicId;
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const previewImageUrl = cld.image(props.publicId);
  console.log(previewImageUrl);
  let content;

  const PreviewImage = () => {
    <AdvancedImage cldImg={previewImageUrl} plugins={[lazyload()]} />;
  };

  if (props.imagesUploaded.length === 0) {
    content = (
      <div className="preview-image flex flex-col justify-center items-center">
        <p>No photos were added yet.</p>
      </div>
    );
  } else if (props.imagesUploaded.length >= 1) {
    content = (
      <div className="preview-image flex flex-col justify-center items-center">
        {props.imagesUploaded.map((publicId) => {
          return (
            <PreviewImage
              key={publicId}
              publicId={publicId}
              cloudName={props.cloudName}
            />
          );
        })}
        <div className="flex flex-col justify-around items-center">
          <p className="my-2 block w-full text-sm p-1 text-center text-gray-900 resize-none sm:leading-6">
            Do you want to keep this image?
          </p>
          <span className="flex flex-row w-full justify-around items-center">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={keepUpdateHandler}
            >
              Yes, keep it!
            </button>
            <button
              type="submit"
              id="submit"
              className="inline-flex items-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={cancelUpdateHandler}
            >
              Nah, delete it.
            </button>
          </span>
        </div>
      </div>
    );
  }

  /* Keep image */
  const UpdateUserImage = useUpdateUserImageMutation();

  const keepUpdateHandler = async () => {
    try {
      const res = await UpdateUserImage({
        userId,
        imageId,
        previewImageUrl,
      }).unwrap();
      console.log(res);
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  /* Delete image */
  const deleteUserImage = useDeleteUserImageMutation();

  const cancelUpdateHandler = async () => {
    try {
      const res = await deleteUserImage({ public_id: imageId }).unwrap();
      console.log(res);
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return <>{content}</>;
};

export default UserImagePreview;
