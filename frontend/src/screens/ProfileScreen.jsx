import { useParams } from "react-router-dom";
import ProfileBanner from "../components/ProfileBanner";
import ProfileGoalList from "../components/ProfileGoalList";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const ProfileScreen = () => {
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
  } else if (!user) {
    content = (
      <>
        <h1>user not found</h1>
        <Link to="/">Return to Dashboard</Link>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <section className="flex flex-col flex-1 mt-4 mx-auto md:flex-row items-start">
          <ProfileBanner
            key={user._id}
            id={user._id}
            user={user}
            createdAt={user.createdAt}
            name={user.name}
          />
        </section>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl underline font-bold text-gray-900">{`${user.name}'s Goals`}</h1>
        </div>
        <section className="container mx-auto mt-10">
          <ProfileGoalList
            key={user._id}
            id={user._id}
            user={user}
            createdAt={user.createdAt}
            name={user.name}
          />
        </section>
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <section className="container mx-auto p-4">{content}</section>;
};

export default ProfileScreen;
