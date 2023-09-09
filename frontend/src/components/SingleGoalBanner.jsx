/* eslint-disable react/prop-types */
import EditGoal from "../components/EditGoal";
import DeleteButton from "../components/DeleteButton";
import ReactionButtons from "../components/ReactionButtons";
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SingleGoalBanner = ({ goal }) => {
  const {
    data: goalData,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetGoalByIdQuery(goal._id);

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo._id;

  let content;

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (goalData.user === user && isSuccess) {
    content = (
      <>
        <span className="pr-2 basis-1/2">
          <EditGoal
            goal={goalData}
            key={goalData._id}
            id={goalData._id}
            title={goalData.title}
            endDate={goalData.endDate}
            isPublic={goalData.isPublic}
          />
        </span>
        <span className="pl-2 basis-1/2">
          <DeleteButton goal={goalData} />
        </span>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <ReactionButtons goal={goalData} reactions={goalData.reactions} />
      </>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="relative container mx-auto p-4">
      <section className="flex justify-center items-start">{content}</section>
    </section>
  );
};

export default SingleGoalBanner;
