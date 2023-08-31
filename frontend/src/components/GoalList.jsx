/* eslint-disable react/prop-types */
import Goal from "./Goal";
import AddGoal from "./AddGoal";
import FormContainer from "./FormContainer";
import { useGetAllGoalsQuery } from "../apiSlices/goalApiSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";

const GoalList = () => {
  const {
    data: goals = [],
    isLoading,
    isFetching,
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

  const NoGoalsMessage = () => {
    return (
      <>
        <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
          <div className="col-span-1 mb-8 md:mx-10">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl text-center font-bold text-gray-800">
                You have no goals yet!
              </h1>
              <h2>
                Click <span className="bold text-indigo-600">Add Goal</span>{" "}
                above to start tracking your goals.
              </h2>
            </div>
          </div>
        </FormContainer>
      </>
    );
  };

  let content;

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (isFetching) {
    document
      .getElementsByClassName("goal-list-group")[0]
      .classList.add("disabled");
  } else if (isSuccess) {
    if (sortedGoals.length === 0) {
      content = (
        <section className="goal-list-group grid-cols-1">
          <NoGoalsMessage />;
        </section>
      );
    } else {
      content = (
        <section className="goal-list-group grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortedGoals.map((goal) => (
            <RenderedGoal key={goal._id} goal={goal} />
          ))}
          ;
        </section>
      );
    }
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="goalList">
      <section className="flex flex-row min-w-full mb-6 justify-evenly items-center">
        <span>
          <AddGoal />
        </span>
      </section>

      {content}
    </section>
  );
};

export default GoalList;
