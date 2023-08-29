import { useParams } from "react-router-dom";
import SingleGoal from "../components/SingleGoal";
import SingleGoalBanner from "../components/SingleGoalBanner";

const SingleGoalScreen = () => {
  let goalId = useParams();
  goalId = goalId.id.slice(1);

  return (
    <>
      <SingleGoalBanner goalId={goalId} />
      <SingleGoal goalId={goalId} />
    </>
  );
};

export default SingleGoalScreen;
