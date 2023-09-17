import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import ProfileBanner from "../components/ProfileBanner";
import AboutMeForm from "../components/AboutMeForm";
import UpdateLoginForm from "../components/UpdateLoginForm";
import ImageInputWidget from "../components/ImageInputWidget";
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 mx-auto">
          <UpdateLoginForm />
          <section className="col-span-1 lg:col-span-2">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AboutMeForm
                key={`aboutme/:${user._id}`}
                id={user._id}
                user={user}
                aboutMe={user.aboutMe}
                image={user.image}
              />
              <ImageInputWidget />
            </section>
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
