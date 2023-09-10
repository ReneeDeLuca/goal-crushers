import getDateArray from "./DateArray";

const CalendarHeader = (goal) => {
  let start = goal.createdAt;
  let end = goal.endDate;
  //variable to hold array of dates
  const headerArray = getDateArray(start, end);
  console.log(headerArray);

  // Helper function to count the number of Sundays in a given month
  const countSundaysInMonth = (monthIndex, yearIndex) => {
    return headerArray.filter(
      (dateObj) =>
        dateObj.monthInd === monthIndex &&
        dateObj.yearInd === yearIndex &&
        dateObj.dayInd === 0
    ).length;
  };

  // Generate the table header JSX with column spans for each month
  const generateTableHeader = () => {
    const monthsAbbr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let header = [];
    let currentMonth = headerArray[0].monthInd;
    let currentYear = headerArray[0].yearInd;
    let currentDay = headerArray[0].day;

    headerArray.forEach((dateObj) => {
      if (header.length === 0) {
        const monthSpan = countSundaysInMonth(currentMonth, currentYear);
        header.push(
          <li
            className="months min-h-[18px]"
            key={`${monthsAbbr[currentMonth]}-${currentYear}-sunday-1`}
          >
            {`${monthsAbbr[currentMonth]} ${currentDay}`}
          </li>
        );
        for (let i = 1; i < monthSpan; i++) {
          header.push(
            <li
              key={`year-${currentYear}-month-${currentMonth}-sunday-${i + 1}`}
              className="min-h-[18px]"
            ></li>
          );
        }
      } else {
        if (
          dateObj.dayInd === 0 &&
          currentDay <= 7 &&
          currentMonth !== dateObj.monthInd
        ) {
          currentMonth = dateObj.monthInd;
          const monthSpan = countSundaysInMonth(currentMonth, currentYear);
          header.push(
            <li
              className="months min-h-[18px]"
              key={`${monthsAbbr[currentMonth]}-${currentYear}-sunday-1`}
            >
              {`${monthsAbbr[currentMonth]} ${currentDay}`}
            </li>
          );
          for (let i = 1; i < monthSpan; i++) {
            header.push(
              <li
                key={`year-${currentYear}-month-${currentMonth}-sunday-${
                  i + 1
                }`}
                className="min-h-[18px]"
              ></li>
            );
          }
        }
      }
      currentYear = dateObj.yearInd;
      currentDay = dateObj.day;
    });
    return header;
  };

  return (
    <section>
      <ul>
        <li className="months-header">
          <span className="months-header-label mt-0.5 text-gray-500">
            Week of:
          </span>
        </li>
        {generateTableHeader()}
      </ul>
    </section>
  );
};

export default CalendarHeader;
