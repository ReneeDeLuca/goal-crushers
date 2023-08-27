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
      <div className="col-span-1 mb-8 md:mx-10" key={goal._id}>
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
      </div>
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
      <section className="goal-list-group grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {content}
      </section>
    </section>
  );
};

export default GoalList;
