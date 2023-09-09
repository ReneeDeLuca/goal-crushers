/* eslint-disable react/prop-types */
import { useDeleteCommentMutation } from "../apiSlices/commentApiSlice";
import { toast } from "react-toastify";

const DeleteCommentButton = ({ comment }) => {
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteCommentClick = async () => {
    try {
      const res = await deleteComment({
        commentId: comment._id,
      }).unwrap();
      console.log(res);
      toast.success("Comment deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <span className="flex basis-1/3 justify-center">
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-white px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleDeleteCommentClick}
      >
        ❌
      </button>
    </span>
  );
};

export default DeleteCommentButton;
