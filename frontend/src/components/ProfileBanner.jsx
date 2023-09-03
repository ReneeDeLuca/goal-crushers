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
        <img
          className="h-32 w-32 rounded-full ring-2 ring-white"
          src={user.image}
          alt="user avatar"
        />
      );
    } else {
      return (
        <img
          className="h-32 w-32 rounded-full ring-2 ring-white"
          src="/4900_8_04_catalyststuff.jpg"
          alt=""
        />
      );
    }
  };

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (user && isSuccess) {
    content = (
      <>
        <section className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <span className="col-span-1">
            <RenderAvatar />
          </span>
        </section>
        <section className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <span className="col-span-1">
            <span className="font-bold text-lg mx-2 text-gray-800">
              {user.name}
            </span>
          </span>
        </section>
        <section className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <span className="col-span-1">
            {/* <span className="text-md mx-2 text-gray-800">{user.aboutMe}</span> */}
            <span className="text-md mx-2 text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque voluptas optio soluta doloribus! Accusantium
              dignissimos voluptate voluptatibus, ad deleniti repudiandae
              quaerat adipisci! Error laboriosam ratione aspernatur nulla rem
              natus labore?
            </span>
          </span>
        </section>
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <>{content}</>;
};

export default ProfileBanner;
