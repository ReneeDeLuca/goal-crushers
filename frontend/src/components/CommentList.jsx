/* eslint-disable react/prop-types */
import { useGetAllCommentsQuery } from "../apiSlices/commentApiSlice";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useMemo } from "react";
import { toast } from "react-toastify";

const CommentList = ({ goal }) => {
  const {
    data: comments = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllCommentsQuery();

  console.log(comments);

  const goalId = goal._id;

  console.log(goalId);

  const sortedComments = useMemo(() => {
    const sortedComments = comments
      .filter((comment) => comment.goalId === goalId)
      .slice();
    sortedComments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedComments;
  }, [comments, goalId]);

  let RenderedComment = ({ comment }) => {
    return (
      <div className="col-span-1 mb-8 md:mx-10" key={comment._id}>
        <Comment
          key={comment._id}
          id={comment._id}
          comment={comment}
          text={comment.text}
          createdAt={comment.createdAt}
          user={comment.commentUser}
          likes={comment.likes}
          goalId={comment.goalId}
          goalUser={comment.goalUser}
        />
      </div>
    );
  };

  const NoCommentsMessage = () => {
    return (
      <>
        <section className="flex min-h-full flex-col mx-auto justify-center px-6 py-6">
          <div className="col-span-1 mb-8 md:mx-10">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl text-center font-bold text-gray-800">
                Be the first to comment!
              </h1>
              <h2>
                Click <span className="bold text-indigo-600">Add Comment</span>{" "}
                to add some encouragement.
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  };

  let content;

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    if (sortedComments.length === 0) {
      content = (
        <section className="comment-list-group grid-cols-1">
          <NoCommentsMessage />
        </section>
      );
    } else if (sortedComments.length === 1) {
      content = (
        <section className="comment-list-group grid-cols-1">
          {sortedComments.map((comment) => (
            <RenderedComment key={comment._id} comment={comment} />
          ))}
        </section>
      );
    } else if (sortedComments.length === 2) {
      content = (
        <section className="comment-list-group grid-cols-1 md:grid-cols-2">
          {sortedComments.map((comment) => (
            <RenderedComment key={comment._id} comment={comment} />
          ))}
        </section>
      );
    } else {
      content = (
        <section className="comment-list-group grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortedComments.map((comment) => (
            <RenderedComment key={comment._id} comment={comment} />
          ))}
        </section>
      );
    }
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="commentList">
      <section className="flex flex-row min-w-full my-6 justify-evenly items-center">
        <span>
          <AddComment
            key={goal._id}
            id={goal._id}
            goal={goal}
            title={goal.title}
            createdAt={goal.createdAt}
            endDate={goal.endDate}
            isPublic={goal.isPublic}
            datesCompleted={goal.datesCompleted}
            user={goal.user}
          />
        </span>
      </section>

      {content}
    </section>
  );
};

export default CommentList;
