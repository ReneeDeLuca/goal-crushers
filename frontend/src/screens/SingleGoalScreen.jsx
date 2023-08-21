import Goal from "../components/Goal";
import { useParams } from "react-router-dom";
import EditGoal from "../components/EditGoal";
import GoalReactionButtons from "../components/reactions/GoalReactionButtons";
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";

const SingleGoalScreen = () => {
    const {goalId} = useParams();

    const {data: goal, isFetching, isSuccess } = useGetGoalByIdQuery(goalId);

    const goalOwner = useGetUserByIdQuery(goal?.user);

    let content

    if (!goal) {
        return (
            <section>
                <h2>Goal not found!</h2>
            </section>
        )
    } else if (isFetching) {
        content = <h2>Loading...</h2>
    } else if (isSuccess) {
        content = (
            <>
                <Goal goal={goal}
                    key={goal._id}
                    id={goal._id}
                    title={goal.title}
                    createdAt={goal.createdAt}
                    endDate={goal.endDate}
                    isPublic={goal.isPublic}
                    reactions={goal.reactions}
                    data={goal.completionData}
                />
                <GoalReactionButtons 
                    goal={goal}
                    reactions={goal.reactions}
                />
                <span className="flex flex-col justify-center items-center">
                    Goal created by: {goalOwner.username}
                </span>
                {goalOwner._id === localStorage.getItem("userId") ? 
                    <span className="flex flex-col justify-center items-center">
                        <EditGoal 
                            goal={goal}
                            key={goal._id}
                            id={goal._id}
                            title={goal.title}
                            endDate={goal.endDate}
                            isPublic={goal.isPublic}
                        />
                    </span>
                : null}
            </>
        );
    }
    return <section className="singleGoal">{content}</section>
};

export default SingleGoalScreen;