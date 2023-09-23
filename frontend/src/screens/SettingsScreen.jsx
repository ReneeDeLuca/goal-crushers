import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import ProfileBanner from "../components/ProfileBanner";
import AboutMeForm from "../components/AboutMeForm";
import ChooseImage from "../components/ChooseImage";
import UpdateLoginForm from "../components/UpdateLoginForm";
import { toast } from "react-toastify";

const SettingsScreen = () => {
  let userId = useParams();
  userId = userId.id.slice(1);

  const {
    data: user,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  let content;

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <ProfileBanner
          key={user._id}
          id={user._id}
          user={user}
          createdAt={user.createdAt}
          name={user.name}
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          <section className="grid grid-cols-1 gap-4">
            <ChooseImage
              key={`chooseimage/:${user._id}`}
              id={user._id}
              user={user}
              image={user.image}
              cloudinaryId={user.cloudinaryId}
            />
          </section>
          <section className="grid grid-cols-1 gap-4">
            <AboutMeForm
              key={`aboutme/:${user._id}`}
              id={user._id}
              user={user}
              aboutMe={user.aboutMe}
              image={user.image}
            />
          </section>

          <section className="grid grid-cols-1 gap-4">
            <UpdateLoginForm />
          </section>
        </section>
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <div className="container mx-auto">{content}</div>;
};

export default SettingsScreen;
