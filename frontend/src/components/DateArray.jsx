import parseISO from "date-fns/parseISO";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import previousSunday from "date-fns/previousSunday";
import nextSaturday from "date-fns/nextSaturday";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import addDays from "date-fns/addDays";

const getDateArray = (start, end) => {
  // get start date in local time
  let startDate = parseISO(start); //eg: 1453-04-29T00:00:00.000Z

  // get first day of the week for start date, Sunday is the first day of the week
  function weekStart(startDate) {
    if (isSunday(startDate)) {
      return startDate;
    } else {
      return (startDate = previousSunday(startDate));
    }
  }

  // get end date in local time
  let endDate = parseISO(end);

  //time period is how many days between weekStart and weekEnd, this is the size of our array
  const timePeriod = differenceInCalendarDays(endDate, startDate);

  //update end date to include time by adding timePeriod to startDate
  endDate = addDays(startDate, timePeriod);

  // get last day of the week for end date, Saturday is the last day of the week
  function weekEnd(endDate) {
    if (isSaturday(endDate)) {
      return endDate;
    } else {
      return (endDate = nextSaturday(endDate));
    }
  }

  //to push to array, start at weekStart and add 1 day until we reach weekEnd
  startDate = weekStart(startDate);
  endDate = weekEnd(endDate);
  const lengthOfDateArray = differenceInCalendarDays(endDate, startDate);

  //push data for each day to array as an object
  const dateArray = [];
  for (let i = 0; i <= lengthOfDateArray; i++) {
    dateArray.push({
      date: new Date(startDate),
      dayInd: startDate.getDay(),
      weekInd: Math.floor(i / 7),
      monthInd: startDate.getMonth(),
      yearInd: startDate.getFullYear(),
      day: startDate.getDate(),
    });
    startDate = addDays(startDate, 1);
  }
  //return array sorted by dayInd (day of the week)
  return dateArray.sort((a, b) => a.dayInd - b.dayInd);
};

export default getDateArray;
