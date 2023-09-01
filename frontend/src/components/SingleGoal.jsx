/* eslint-disable react/prop-types */
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { toast } from "react-toastify";
import CreateCalendar from "./CreateCalendar";
import CalendarHeader from "./CalendarHeader";
import TimeAgo from "./TimeAgo";
import format from "date-fns/format";

const SingleGoal = ({ goalId }) => {
  const {
    data: goal,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetGoalByIdQuery(goalId);

  let content;

  let RenderedGoal = ({ goal }) => {
    let endDate = String(goal.endDate).slice(0, 11);
    let endDateTime = String(goal.createdAt).slice(11, -1);
    endDate = endDate + endDateTime;
    endDate = new Date(endDate);
    let formatEndDate = format(endDate, "PP");

    return (
      <section id="goal-container" className="md:max-h-[30rem]">
        <section className="goal-info text-center">
          <div className="basis-1/2 text-center pt-8 items-baseline">
            <h2 className="text-xl underline align-bottom items-start font-bold text-gray-600">{`${goal.title}`}</h2>
          </div>
          <div className="basis-1/2 text-end py-4 my-auto justify-end">
            <h3 className="text-lg text-gray-600">{`Created by: ${goal.userName}`}</h3>
          </div>
        </section>
        <section
          id="calendar-chart"
          className="md:overflow-y-auto pr-4 flex-row pt-1"
        >
          <div className="calendar-label mr-6 ml-4 basis-1/5">
            <CalendarHeader
              key={goal._id}
              id={goal._id}
              createdAt={goal.createdAt}
              endDate={goal.endDate}
            />
          </div>
          <div className="basis-3/5">
            <CreateCalendar
              key={goal._id}
              id={goal._id}
              createdAt={goal.createdAt}
              endDate={goal.endDate}
              datesCompleted={goal.datesCompleted}
            />
          </div>
          <div>
            <section className="basis-1/5 calendar-label"></section>
          </div>
        </section>
        <section className="goal-meta-data">
          <div className="min-w-full">
            <ul className="flex-col min-w-full justify-around p-2">
              <li className="flex flex-row basis-1/2 mb-1">
                <span className="text-xs text-gray-600 text-start basis-1/5">
                  Created:{" "}
                </span>
                {<TimeAgo timestamp={goal.createdAt} />}
                <span className="text-xs text-gray-600 text-end pr-2 basis-2/5">
                  {goal.isPublic ? `Public: ✅` : `Public: ❌`}
                </span>
              </li>
              <li className="flex flex-row basis-1/2 mt-1">
                <span className="text-xs text-gray-600 basis-1/5 text-start">
                  Ends on:{" "}
                </span>
                <span className="text-xs text-gray-800 basis-2/5 text-start">{`${formatEndDate}`}</span>
                <span className="text-xs text-gray-600 basis-2/5 text-end pr-2"></span>
              </li>
            </ul>
          </div>
        </section>
      </section>
    );
  };

  if (isLoading || isFetching) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    content = (
      <RenderedGoal
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
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="singleGoal mx-auto">
      <section className="grid-cols-1">{content}</section>
    </section>
  );
};

export default SingleGoal;
