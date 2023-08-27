import Goal from "./Goal";
import AddGoal from "./AddGoal";
import { useGetAllGoalsQuery } from "../apiSlices/goalApiSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";

const GoalList = () => {
  const {
    data: goals = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllGoalsQuery();

  const sortedGoals = useMemo(() => {
    const sortedGoals = goals.slice();
    sortedGoals.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedGoals;
  }, [goals]);

  let RenderedGoal = ({ goal }) => {
    return (
      <li className="mb-8 md:mx-10" key={goal._id}>
        <Goal
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
      </li>
    );
  };

  let content;

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    content = sortedGoals.map((goal) => (
      <RenderedGoal key={goal._id} goal={goal} />
    ));
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="goalList">
      <section className="flex flex-row min-w-full mb-6 justify-evenly md:justify-start items-center">
        <span>
          <AddGoal />
        </span>
      </section>
      <ul className="goal-list-group md:columns-2 lg:columns-3 md:flex-row">
        {content}
      </ul>
    </section>
  );
};

export default GoalList;
