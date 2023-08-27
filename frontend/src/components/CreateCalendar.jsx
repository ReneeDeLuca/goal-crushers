import CalendarBody from "./CalendarBody";

const CreateCalendar = (goal) => {
  return (
    <>
      <table className="calendar-graph">
        <caption className="sr-only">Goal activity</caption>
        <thead>
          <tr className="table-head-row grow">
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Sunday</span>
              <span>{"   "}</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Monday</span>
              <span>M</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Tuesday</span>
              <span>{"   "}</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Wednesday</span>
              <span>W</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Thursday</span>
              <span>{"   "}</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Friday</span>
              <span>F</span>
            </th>
            <th className="day-of-week text-gray-500" scope="col">
              <span className="sr-only">Saturday</span>
              <span>{"   "}</span>
            </th>
          </tr>
        </thead>

        <CalendarBody
          key={goal._id}
          id={goal._id}
          createdAt={goal.createdAt}
          endDate={goal.endDate}
          datesCompleted={goal.datesCompleted}
        />
      </table>
    </>
  );
};

export default CreateCalendar;
