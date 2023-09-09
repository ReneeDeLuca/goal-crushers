/* eslint-disable react/prop-types */
import { useAddLikeMutation } from "../apiSlices/commentApiSlice";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import { toast } from "react-toastify";
import TimeAgo from "./TimeAgo";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteCommentButton from "./DeleteCommentButton";

const Comment = ({ comment }) => {
  const { data: userData } = useGetUserByIdQuery(comment.commentUser);
  console.log(comment.commentUser);

  const userName = userData.name;

  const { userInfo } = useSelector((state) => state.auth);

  const [addLike] = useAddLikeMutation();

  const [likes, setLikes] = useState(comment.likes);

  let content;
  let isAuthorized =
    userInfo._id === comment.commentUser || userInfo._id === comment.goalUser;

  const handleLikeClick = async () => {
    try {
      const res = await addLike({
        commentId: comment._id,
      }).unwrap();
      setLikes(res.likes);
      console.log(res);
      toast.success("Like added successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  let RenderedComment = ({ comment }) => {
    return (
      <section className="comment-container">
        <div className="text-start text-indigo-600 font-bold text-sm">
          {userName} commented:
        </div>
        <div className="text-start text-gray-800 py-2 text-sm">
          {comment.text}
        </div>
        <div className="flex flex-row justify-between width-full">
          <span className="basis-1/3 justify-items-start">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleLikeClick}
            >
              ❤️
            </button>
            <span className="text-start text-gray-600 text-xs"> {likes}</span>
          </span>
          {isAuthorized && <DeleteCommentButton comment={comment} />}
          <TimeAgo timestamp={comment.createdAt} />
        </div>
      </section>
    );
  };

  content = <RenderedComment comment={comment} userData={userData} />;

  return <>{content}</>;
};

export default Comment;
