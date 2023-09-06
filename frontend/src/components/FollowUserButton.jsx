/* eslint-disable react/prop-types */
import { useFollowUserMutation } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";

const FollowUserButton = ({ userId, followId, followName }) => {
  const [followUser] = useFollowUserMutation();

  const onFollowClickedHandler = async () => {
    try {
      const res = await followUser({
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
      onClick={onFollowClickedHandler}
    >
      Follow {`${followName}`}
    </button>
  );

  return <div>{content}</div>;
};

export default FollowUserButton;
