/* eslint-disable react/prop-types */
import { format } from "date-fns";
import FavoriteButton from "./FavoriteButton";

const ProfileBanner = ({ user }) => {
  const userCreated = new Date(user.createdAt);
  const dateJoined = format(userCreated, "MMMM yyyy");

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
  const RenderAboutMe = () => {
    if (user.aboutMe === "") {
      return (
        <p className="text-md mx-2 text-gray-800 whitespace-pre-line">
          <span className="font-bold text-indigo-800 text-left">About me:</span>{" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          voluptas optio soluta doloribus! Accusantium dignissimos voluptate
          voluptatibus, ad deleniti repudiandae quaerat adipisci! Error
          laboriosam ratione aspernatur nulla rem natus labore?
        </p>
      );
    } else {
      return (
        <p className="text-md mx-2 max-w-full max-h-full overflow-y-auto break-words text-gray-800 whitespace-pre-line">
          <span className="font-bold text-indigo-800 text-left">About me:</span>{" "}
          {user.aboutMe}
        </p>
      );
    }
  };

  return (
    <>
      <section>
        <section
          id="profile-banner"
          className="grid-flow-row-dense grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4"
        >
          <div className="profile-banner-item col-span-1 justify-start">
            <div className="flex flex-col pl-6 items-start">
              <span className="font-bold text-lg mx-2 my-4 text-gray-800">
                {user.name}
              </span>
              <span className="text-sm mx-2 mt-4 italic text-gray-600">
                Crushing goals since:
              </span>
              <span className="text-sm mx-2 italic text-gray-600">
                {dateJoined}
              </span>
              <span className="mt-4">
                <FavoriteButton
                  key={user._id}
                  user={user}
                  followId={user._id}
                  followName={user.name}
                />
              </span>
            </div>
          </div>
          <div className="profile-banner-item col-span-1 justify-center">
            <RenderAvatar />
          </div>
          <div className="flex flex-col profile-banner-item col-span-2 justify-center">
            <RenderAboutMe />
          </div>
        </section>
      </section>
    </>
  );
};

export default ProfileBanner;
