/* eslint-disable react/prop-types */
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const ProfileBanner = ({ userId }) => {
  const {
    data: user,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  let content;

  const RenderAvatar = () => {
    if (user.image) {
      return (
        <div className="min-w-0 md:justify-end md:flex-1 inline-flex">
          <div className="mr-2">
            <img
              className="h-10 w-10 rounded-full ring-2 ring-white"
              src={user.image}
              alt="user avatar"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-w-0 md:justify-end md:flex-1 inline-flex">
          <div className="mr-2">
            <img
              className="h-10 w-10 rounded-full ring-2 ring-white"
              src="/4900_8_04_catalyststuff.jpg"
              alt=""
            />
          </div>
        </div>
      );
    }
  };

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (user && isSuccess) {
    content = (
      <>
        <span className="pr-2 basis-1/2">
          <RenderAvatar />
        </span>
        <span className="pl-2 basis-1/2">
          <span className="font-bold mx-2 leading-7 text-gray-900 sm:truncate sm:tracking-tight">
            {user.name}
          </span>
        </span>
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="relative container mx-auto p-4">
      <section className="flex justify-center items-start">{content}</section>
    </section>
  );
};

export default ProfileBanner;
