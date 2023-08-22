import Goal from "./Goal";
import TimeAgo from "./TimeAgo";
import AddGoal from "./AddGoal";
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
            <li key={goal._id}>
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
            <section className='flex flex-row min-w-full justify-evenly items-center'>
                <h2 className="px-6 py-2 lg:px-8 text-2xl font-bold text-gray-800">Goals</h2>
                <span>            
                    <AddGoal />
                </span>
            </section>
            <ul className="goal-list-group">
                {content}
            </ul>
        </section>
    );

}

export default GoalList;