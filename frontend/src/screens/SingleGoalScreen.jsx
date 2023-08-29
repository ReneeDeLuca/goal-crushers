import { useParams } from "react-router-dom";
import SingleGoal from "../components/SingleGoal";
import SingleGoalBanner from "../components/SingleGoalBanner";

const SingleGoalScreen = () => {
  let goalId = useParams();
  console.log(goalId);
  goalId = goalId.id.slice(1);
  console.log(goalId);

  return (
    <>
      <SingleGoalBanner goalId={goalId} />
      <SingleGoal goalId={goalId} />
    </>
  );
};

export default SingleGoalScreen;
