import getDateArray from "./DateArray"


const CalendarBody = () => {
    let start = new Date('2023-01-06');
    let end = new Date('2023-10-31');
    // Variable to hold array of date objects
    const bodyArray = getDateArray(start,end);

    let days = [[], [], [], [], [], [], []]; // One array for each day of the week (Sunday = 0, Monday = 1, ..., Saturday = 6)
    
    // Helper function to group dates by day of the week index
  const groupDatesByDay = () => {
    bodyArray.forEach((dateObj) => {
      const dayIndex = dateObj.dayInd;
      days[dayIndex].push(dateObj);
    });
    return days;
  };
  //returns an array of arrays, each array is a day of the week, each array contains date objects for that day of the week
  
  // Generate the table body JSX with one row for each day of the week
  const generateTableBody = () => {
    const days = groupDatesByDay();
    return days.map((day, index) => {
      return (
        <tr key={`day-${index}`}>
          {day.map((dateObj) => (
            <td className= 'goal-cal-day' key={`${dateObj.date}`}>
              <span className="sr-only">
                {`${dateObj.monthInd + 1}-${dateObj.day}-${dateObj.yearInd}`}
              </span>
            </td>
          ))}
        </tr>
      );
    });
  };
  return <tbody>{generateTableBody()}</tbody>
}

export default CalendarBody;