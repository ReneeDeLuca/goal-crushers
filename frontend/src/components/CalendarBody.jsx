import getDateArray from "./DateArray";
import Tooltip from "./Tooltip";
import format from "date-fns/format";

const CalendarBody = (goal) => {
  let start = goal.createdAt;
  let end = goal.endDate;
  // Variable to hold array of date objects
  const dateArray = getDateArray(start, end);

  const completedDatesArray = goal.datesCompleted;

  // Helper function to group dates by week index
  const groupDatesByWeek = () => {
    const weeks = [];
    dateArray.forEach((dateObj) => {
      const weekIndex = dateObj.weekInd;
      if (!weeks[weekIndex]) {
        weeks[weekIndex] = [];
      }
      weeks[weekIndex].push(dateObj);
    });
    return weeks;
  };

  // Generate the table body JSX with one row for each week
  const generateTableBody = () => {
    const weeks = groupDatesByWeek();
    return weeks.map((week, index) => {
      return (
        <tr className="goal-week-row" key={`week-${index}`}>
          {week.map((dateObj) => {
            const options = {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            };
            const checkDate = dateObj.date.toLocaleDateString("en-US", options);

            if (completedDatesArray.includes(checkDate)) {
              return (
                <td
                  className="goal-cal-completed-day"
                  key={`day-${format(new Date(dateObj.date), "PP")}`}
                >
                  {
                    <Tooltip
                      message={`${format(new Date(dateObj.date), "PP")}`}
                    />
                  }
                </td>
              );
            } else {
              return (
                <td
                  className="goal-cal-day"
                  key={`day-${format(new Date(dateObj.date), "PP")}`}
                >
                  {
                    <Tooltip
                      message={`${format(new Date(dateObj.date), "PP")}`}
                    />
                  }
                </td>
              );
            }
          })}
        </tr>
      );
    });
  };

  return <tbody className="goal-table-body">{generateTableBody()}</tbody>;
};

export default CalendarBody;
