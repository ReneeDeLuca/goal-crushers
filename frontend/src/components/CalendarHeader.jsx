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
    let currentDay

    headerArray.forEach((dateObj) => {
      if (dateObj.dayInd === 0 && (dateObj.monthInd !== currentMonth || dateObj.yearInd !== currentYear)) {
        // Render the month header when it's the first Sunday of a new month
        if (currentMonth !== -1) {
          const monthSpan = countSundaysInMonth(currentMonth, currentYear);
          header.push(
            <tr key={`year-${currentYear}-month-${currentMonth}-day-${currentDay}`}>
              <td className="months basis-auto" key={`${monthsAbbr[currentMonth]}`}>
                {monthsAbbr[currentMonth]}
              </td>
            </tr>
          );
          for (let i = 1; i < monthSpan; i++) {
            header.push(<tr key={`year-${currentYear}-month-${currentMonth}-sunday-${i+1}`}></tr>);
          }
        }
        currentDay = dateObj.day;
        currentMonth = dateObj.monthInd;
        currentYear = dateObj.yearInd;
      }      
    });

    return header;
  };

  return (
    <table>
      <thead className="table-head-row">
      </thead>
      <tbody>
        {generateTableHeader()}
      </tbody>
    </table>
  );
}


    export default CalendarHeader;