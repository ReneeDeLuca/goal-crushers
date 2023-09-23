/* eslint-disable react/prop-types */
import {
  useDeleteUserImageMutation,
  useUpdateUserImageMutation,
} from "../../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const ImagePreviewButtons = (props) => {
  const url = props.url;
  const userId = props.userId;
  const imageId = props.publicId;

  /* Keep image */
  const UpdateUserImage = useUpdateUserImageMutation();

  const keepUpdateHandler = async () => {
    try {
      const res = await UpdateUserImage({
        userId: userId,
        imageId: imageId,
        url: url,
      }).unwrap();
      console.log(res);
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const clickKeepUpdateHandler = () => {
    keepUpdateHandler();
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
  const clickCancelUpdateHandler = () => {
    cancelUpdateHandler();
  };

  return (
    <>
      <p className="my-2 block w-full text-sm p-1 text-center text-gray-900 resize-none sm:leading-6">
        Do you want to keep this image?
      </p>
      <span className="flex flex-row w-full justify-around items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={clickKeepUpdateHandler}
        >
          Yes, keep it!
        </button>
        <button
          type="submit"
          id="submit"
          className="inline-flex items-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={clickCancelUpdateHandler}
        >
          Nah, delete it.
        </button>
      </span>
    </>
  );
};

export default ImagePreviewButtons;
