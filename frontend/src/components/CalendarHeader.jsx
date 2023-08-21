import getDateArray from "./DateArray";

const CalendarHeader = (goal) => {
  let start = goal.createdAt
    let end = goal.endDate
  //variable to hold array of dates
  const headerArray = getDateArray(start, end);
  
  // Helper function to count the number of Sundays in a given month
  const countSundaysInMonth = (monthIndex, yearIndex) => {
    return headerArray.filter(
      (dateObj) => dateObj.monthInd === monthIndex && dateObj.yearInd === yearIndex && dateObj.dayInd === 0
    ).length;
  };

  // Generate the table header JSX with column spans for each month
  const generateTableHeader = () => {
    const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let header = [];
    let currentMonth = -1;
    let currentYear = headerArray[0].yearInd;

    headerArray.forEach((dateObj) => {
      if (dateObj.dayInd === 0 && dateObj.monthInd !== currentMonth) {
        // Render the month header when it's the first Sunday of the month
        if (currentMonth !== -1) {
          const monthSpan = countSundaysInMonth(currentMonth, dateObj.yearInd);
          header.push(
            // <Tooltip key={`year-${currentYear}-month-${currentMonth}`} message={`${currentYear}-${monthsAbbr[currentMonth]}`}>
            <th className = 'basis-auto' key={`year-${currentYear}-month-${currentMonth}`} colSpan={monthSpan}>
              {monthsAbbr[currentMonth]}
            </th>
            // </Tooltip>
          );
        }
        currentMonth = dateObj.monthInd;
        currentYear = dateObj.yearInd;
      }
    });

    // Add the last month's header after the loop finishes
    if (currentMonth !== -1) {
      const monthSpan = countSundaysInMonth(currentMonth, headerArray[headerArray.length - 1].yearInd);
      header.push(
        // <Tooltip key={`year-${currentYear}-month-${currentMonth}`} message={`${currentYear}-${monthsAbbr[currentMonth]}`}>
        <th className = 'basis-auto' key={`year-${currentYear}-month-${currentMonth}`} colSpan={monthSpan}>
          {monthsAbbr[currentMonth]}
        </th>
        // </Tooltip>
      );
    }

    return header;
  };
  return (
    <thead>
      <tr className="table-head-row justify-between min-w-fit shrink-0">
        {generateTableHeader()}
      </tr>
    </thead>
  );
}


    export default CalendarHeader;