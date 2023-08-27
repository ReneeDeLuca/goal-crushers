const getDateArray = (start, end) => {
  // get start date in local time
  let startDate = new Date(start);
  const startDateMil = Date.parse(startDate);
  const startDateOffset = startDate.getTimezoneOffset() * 60000;
  startDate = new Date(startDateMil + startDateOffset);

  // get first day of the week for start date, Sunday is the first day of the week
  function weekStart(startDate) {
    return startDate.getDay() === 0
      ? startDate
      : new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() - startDate.getDay()
        );
  }

  // get end date in local time
  let endDate = new Date(end);
  const endDateMil = Date.parse(endDate);
  const endDateOffset = endDate.getTimezoneOffset() * 60000;
  endDate = new Date(endDateMil + endDateOffset);

  // get last day of the week for end date, Saturday is the last day of the week
  function weekEnd(endDate) {
    return endDate.getDay() === 0
      ? endDate
      : new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + (6 - endDate.getDay())
        );
  }

  //to push to array, start at weekStart and add 1 day until we reach weekEnd
  startDate = weekStart(startDate);
  endDate = weekEnd(endDate);

  //time period is how many days between weekStart and weekEnd, this is the size of our array
  const timePeriod = (Date.parse(endDate) - Date.parse(startDate)) / 86400000;

  //push data for each day to array as an object
  const dateArray = [];
  for (let i = 0; i <= timePeriod; i++) {
    dateArray.push({
      date: new Date(startDate),
      dayInd: startDate.getDay(),
      weekInd: Math.floor(i / 7),
      monthInd: startDate.getMonth(),
      yearInd: startDate.getFullYear(),
      day: startDate.getDate(),
    });
    startDate.setDate(startDate.getDate() + 1);
  }
  //return array sorted by dayInd (day of the week)
  return dateArray.sort((a, b) => a.dayInd - b.dayInd);
};

export default getDateArray;
