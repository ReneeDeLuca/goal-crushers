/* eslint-disable react/prop-types */
import EditGoal from "../components/EditGoal";
import DeleteButton from "../components/DeleteButton";
import ReactionButtons from "../components/ReactionButtons";
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SingleGoalBanner = ({ goalId }) => {
  const {
    data: goal,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetGoalByIdQuery(goalId);
  console.log(goal);

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo._id;

  let content;

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (goal.user === user && isSuccess) {
    content = (
      <>
        <span className="pr-2 basis-1/2">
          <EditGoal
            goal={goal}
            key={goal._id}
            id={goal._id}
            title={goal.title}
            endDate={goal.endDate}
            isPublic={goal.isPublic}
          />
        </span>
        <span className="pl-2 basis-1/2">
          <DeleteButton goal={goal} />
        </span>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <ReactionButtons goal={goal} reactions={goal.reactions} />
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <container className="relative container mx-auto p-4">
      <section className="flex items-start">{content}</section>
    </container>
  );
};

export default SingleGoalBanner;
