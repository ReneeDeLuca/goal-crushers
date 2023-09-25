/* eslint-disable react/prop-types */
import { useGetGoalByIdQuery } from "../apiSlices/goalApiSlice";
import { toast } from "react-toastify";
import CreateCalendar from "./CreateCalendar";
import CalendarHeader from "./CalendarHeader";
import TimeAgo from "./TimeAgo";
import format from "date-fns/format";
import { Link } from "react-router-dom";

const SingleGoal = ({ goal }) => {
  const {
    data: goalData,
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetGoalByIdQuery(goal._id);

  let content;

  let RenderedGoal = ({ goalData }) => {
    let endDate = String(goalData.endDate).slice(0, 11);
    let endDateTime = String(goalData.createdAt).slice(11, -1);
    endDate = endDate + endDateTime;
    endDate = new Date(endDate);
    let formatEndDate = format(endDate, "PP");

    return (
      <section id="single-goal-container" className="md:max-h-[30rem]">
        <section className="goal-info text-center">
          <div className="basis-1/2 text-center pt-8 items-baseline">
            <h2 className="text-xl underline align-bottom items-start font-bold text-gray-600">{`${goalData.title}`}</h2>
          </div>
          <div className="basis-1/2 text-end py-4 my-auto justify-end">
            <span></span>
          </div>
        </section>
        <section id="calendar-chart" className="md:overflow-y-auto px-2 pt-1">
          <div className="calendar-label col-span-1">
            <CalendarHeader
              key={goalData.title}
              id={goalData._id}
              createdAt={goalData.createdAt}
              endDate={goalData.endDate}
            />
          </div>
          <div className="col-span-2 mx-auto">
            <CreateCalendar
              key={goalData.endDate}
              id={goalData._id}
              createdAt={goalData.createdAt}
              endDate={goalData.endDate}
              datesCompleted={goalData.datesCompleted}
            />
          </div>
          <div>
            <section className="col-span-1 calendar-label justify-end"></section>
          </div>
        </section>
        <section className="goal-meta-data">
          <div className="min-w-full">
            <ul className="flex-col min-w-full justify-around p-2">
              <li className="flex flex-row basis-1/2 mb-1">
                <span className="text-xs text-gray-600 text-start basis-1/3">
                  Created by:
                </span>
                <Link
                  to={`/profile/:${goalData.user}`}
                  className="text-xs underline bold text-indigo-600 basis-1/3 text-start"
                >{`${goalData.userName}`}</Link>
                <TimeAgo timestamp={goalData.createdAt} />
              </li>
              <li className="flex flex-row basis-1/2 mt-1">
                <span className="text-xs text-gray-600 basis-1/3 text-start">
                  Ends on:
                </span>
                <span className="text-xs text-gray-800 basis-1/3 text-start">{`${formatEndDate}`}</span>
                <span className="text-xs text-gray-600 text-end basis-1/3">
                  {goalData.isPublic ? `Public: ✅` : `Public: ❌`}
                </span>
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
        key={goalData._id}
        id={goalData._id}
        goalData={goalData}
        title={goalData.title}
        createdAt={goalData.createdAt}
        endDate={goalData.endDate}
        isPublic={goalData.isPublic}
        datesCompleted={goalData.datesCompleted}
        user={goalData.user}
      />
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="container singleGoal mx-auto">
      <section className="grid-cols-1">{content}</section>
    </section>
  );
};

export default SingleGoal;
