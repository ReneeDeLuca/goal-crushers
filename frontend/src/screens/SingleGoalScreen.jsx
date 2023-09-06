import { useParams } from "react-router-dom";
import SingleGoal from "../components/SingleGoal";
import SingleGoalBanner from "../components/SingleGoalBanner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { Navigate } from "react-router-dom";

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

  let content;

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (goal.user === user && isSuccess) {
    content = (
      <>
        <SingleGoalBanner goalId={goalId} />
        <SingleGoal goalId={goalId} />
      </>
    );
  } else if (isSuccess && !goal.isPublic) {
    toast.error("Goal not found");
    content = <Navigate to="/" />;
  } else if (isSuccess && goal.isPublic) {
    content = (
      <>
        <SingleGoalBanner goalId={goalId} />
        <SingleGoal goalId={goalId} />
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return <>{content}</>;
};

export default SingleGoalScreen;
