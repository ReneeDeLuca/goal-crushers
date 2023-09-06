/* eslint-disable react/prop-types */
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FollowUserButton from "./FollowUserButton";
import UnfollowUserButton from "./UnfollowUserButton";

const FavoriteButton = ({ followId, followName }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const {
    data: loggedInUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(userId);
  console.log(loggedInUser);

  const favorites = [...loggedInUser.favorites];

  let content;

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (userId === followId) {
    content = (
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <Link to="/">Dashboard</Link>
      </button>
    );
  } else if (isSuccess && !favorites.includes(followId)) {
    content = (
      <>
        <FollowUserButton
          userId={userId}
          followId={followId}
          followName={followName}
        />
      </>
    );
  } else if (isSuccess && favorites.includes(followId)) {
    content = (
      <>
        <UnfollowUserButton
          userId={userId}
          followId={followId}
          followName={followName}
        />
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <div>{content}</div>;
};

export default FavoriteButton;
