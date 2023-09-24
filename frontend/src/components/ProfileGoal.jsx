/* eslint-disable react/prop-types */
import CalendarHeader from "./CalendarHeader";
import CreateCalendar from "./CreateCalendar";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const ProfileGoal = ({ goal }) => {
  let endDate = String(goal.endDate).slice(0, 11);
  let endDateTime = String(goal.createdAt).slice(11, -1);
  endDate = endDate + endDateTime;
  endDate = new Date(endDate);
  let formatEndDate = format(endDate, "PP");

  return (
    <section id="goal-container" className="md:max-h-[30rem]">
      <section className="goal-info">
        <div className="basis-1/2 text-center py-4 items-center">
          <Link to={`/goal/:${goal._id}`}>
            <h2 className="text-xl underline align-bottom items-start font-bold text-gray-600">{`${goal.title}`}</h2>
          </Link>
        </div>
      </section>
      <section id="calendar-chart" className="md:overflow-y-auto px-2 pt-1">
        <div className="calendar-label col-span-1">
          <CalendarHeader
            key={goal._id}
            id={goal._id}
            createdAt={goal.createdAt}
            endDate={goal.endDate}
          />
        </div>
        <div className="col-span-2 mx-auto">
          <CreateCalendar
            key={goal._id}
            id={goal._id}
            createdAt={goal.createdAt}
            endDate={goal.endDate}
            datesCompleted={goal.datesCompleted}
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
              <span className="text-xs text-gray-600 text-start basis-1/5">
                Created:{" "}
              </span>
              {<TimeAgo timestamp={goal.createdAt} />}
              <span className="text-xs text-gray-600 text-end pr-2 basis-2/5"></span>
            </li>
            <li className="flex flex-row basis-1/2 mt-1">
              <span className="text-xs text-gray-600 basis-1/5 text-start">
                Ends on:{" "}
              </span>
              <span className="text-xs text-gray-800 basis-2/5 text-start">{`${formatEndDate}`}</span>
              <span className="text-xs text-gray-600 text-end basis-2/5"></span>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default ProfileGoal;
