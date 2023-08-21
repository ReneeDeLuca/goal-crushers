import Goal from "./Goal";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { useGetAllGoalsQuery } from '../apiSlices/goalApiSlice'
import { useMemo } from "react";

   

const GoalList = () => {
    const {
        data: goals = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllGoalsQuery();

    const sortedGoals = useMemo(() => {
        const sortedGoals = goals.slice()
        sortedGoals.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        return sortedGoals
    }, [goals])

    let RenderedGoal = ({goal}) => {
        return (
            <li key={goal._id} className="list-group-item">
                <Goal 
                    key={goal._id}
                    id={goal._id}
                    goal={goal}
                    title={goal.title}
                    createdAt={goal.createdAt}
                    endDate={goal.endDate}
                    isPublic={goal.isPublic}
                    reactions={goal.reactions}
                    data={goal.completionData}
                    user={goal.user}
                />
                <TimeAgo timestamp={goal.createdAt} />
                <Link to={`/goal/:${goal._id}`} className="btn btn-primary">
                    View Goal
                </Link>
            </li>
        )};    

    let content

    if (isLoading) {
        content = <div className="loader">Loading...</div>
    } else if (isSuccess) {
        content = sortedGoals.map(goal => <RenderedGoal key={goal._id} goal={goal} />)
        
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="goalList">
            <h2>Goals</h2>
            <ul className="list-group">
                {content}
            </ul>
        </section>
    );

}

export default GoalList;