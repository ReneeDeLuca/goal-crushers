import { useParams } from "react-router-dom";
import SingleGoal from "../components/SingleGoal";
import SingleGoalBanner from "../components/SingleGoalBanner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { useGetAllCommentsQuery } from "../apiSlices/commentApiSlice";
import { Navigate } from "react-router-dom";
import CommentList from "../components/CommentList";
// import AddComment from "../components/AddComment";

const SingleGoalScreen = () => {
  let goalId = useParams();
  goalId = goalId.id.slice(1);
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo._id;

  const {
    data: goal,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetGoalByIdQuery(goalId);

  const { data: comments } = useGetAllCommentsQuery();

  console.log(comments);

  let content;

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (goal.user === user && isSuccess) {
    content = (
      <>
        <SingleGoalBanner
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
        <SingleGoal
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
        <CommentList
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
        {/* <AddComment
          key={goal._id}
          id={goal._id}
          goal={goal}
          title={goal.title}
          createdAt={goal.createdAt}
          endDate={goal.endDate}
          isPublic={goal.isPublic}
          datesCompleted={goal.datesCompleted}
          user={goal.user}
        /> */}
      </>
    );
  } else if (isSuccess && !goal.isPublic) {
    toast.error("Goal not found");
    content = <Navigate to="/" />;
  } else if (isSuccess && goal.isPublic) {
    content = (
      <>
        <SingleGoalBanner
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
        <SingleGoal
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
        <CommentList
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
        {/* <AddComment
          key={goal._id}
          id={goal._id}
          goal={goal}
          title={goal.title}
          createdAt={goal.createdAt}
          endDate={goal.endDate}
          isPublic={goal.isPublic}
          datesCompleted={goal.datesCompleted}
          user={goal.user}
        /> */}
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <>{content}</>;
};

export default SingleGoalScreen;
