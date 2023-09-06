/* eslint-disable react/prop-types */
import { useUnfollowUserMutation } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const UnfollowUserButton = ({ userId, followId, followName }) => {
  const [unfollowUser] = useUnfollowUserMutation();

  const onUnfollowClickedHandler = async () => {
    try {
      const res = await unfollowUser({
        userId: userId,
        followId: followId,
        followName: followName,
      }).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  let content = (
    <button
      type="submit"
      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onUnfollowClickedHandler}
    >
      Unfollow {`${followName}`}
    </button>
  );

  return <div>{content}</div>;
};

export default UnfollowUserButton;
