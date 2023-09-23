/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUpdateUserImageMutation } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const ChooseImage = (props) => {
  const userId = props.id;

  const [userImage, setUserImage] = useState(props.cloudinaryId);
  const [imageUrl, setImageUrl] = useState(props.image);

  const imageIds = [
    {
      publicId: "user_image_01",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_01.jpg",
    },
    {
      publicId: "user_image_02",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_02.jpg",
    },
    {
      publicId: "user_image_03",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_03.jpg",
    },
    {
      publicId: "user_image_04",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_04.jpg",
    },
    {
      publicId: "user_image_05",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_05.jpg",
    },
    {
      publicId: "user_image_06",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_06.jpg",
    },
    {
      publicId: "user_image_07",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_07.jpg",
    },
    {
      publicId: "user_image_08",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_08.jpg",
    },
    {
      publicId: "user_image_09",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_09.jpg",
    },
    {
      publicId: "user_image_10",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_10.jpg",
    },
    {
      publicId: "user_image_11",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_11.jpg",
    },
    {
      publicId: "user_image_12",
      url: "https://res.cloudinary.com/goalcrushers/image/upload/v1689871702/user_image_12.jpg",
    },
  ];

  // Image Button Select/Deselect

  const [selectedImage, setselectedImage] = useState("");

  const handleImageClick = (e) => {
    setselectedImage(e.target.src);
    setUserImage(e.target.alt);
    setImageUrl(e.target.src);
    console.log(e.target);
  };

  const content = imageIds.map((image) => (
    <div key={image.publicId} className="col-span-1 mx-auto">
      <button
        type="button"
        id={image.publicId}
        value={image.url}
        onClick={handleImageClick}
      >
        <img
          src={`${image.url}`}
          alt={`${image.publicId}`}
          className="preview-image"
        />
      </button>
    </div>
  ));

  /* Update image */
  const [updateUserImage] = useUpdateUserImageMutation();

  const updateImageHandler = async () => {
    try {
      const res = await updateUserImage({
        userId,
        imageUrl,
        userImage,
      }).unwrap();
      console.log(res);
      setselectedImage(res.image);
      setUserImage(res.cloudinaryId);
      setImageUrl(res.image);
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <table className="col-span-1">
        <tbody>
          <tr className="">
            <td className="flex card px-5 md:pb-0 md:pt-5 items-start">
              <section className="flex min-h-full flex-1 flex-col px-6">
                <div className="mx-auto w-full sm:max-w-sm">
                  <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update User Image
                  </h2>
                </div>
                <div className="mx-auto w-full sm:max-w-sm">
                  {" "}
                  {selectedImage === "" ? (
                    <p className="my-2 block w-full text-sm p-1 text-center text-gray-900 resize-none sm:leading-6">
                      Choose your user image.
                    </p>
                  ) : (
                    <div className="flex card px-5 mx-auto md:pb-0 md:pt-5 items-start">
                      <img
                        className="h-32 w-32 mx-auto rounded-full ring-2 ring-white"
                        src={selectedImage}
                        alt="user avatar"
                      />
                    </div>
                  )}
                </div>
                <div className="grid mt-2 sm:mx-auto sm:w-full sm:max-w-sm grid-cols-4 gap-1 ">
                  {content}
                </div>
                <span className="flex card p-5 mx-auto items-start">
                  <button
                    type="submit"
                    id="submitUpdateImage"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={updateImageHandler}
                  >
                    Set User Image
                  </button>
                </span>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ChooseImage;
