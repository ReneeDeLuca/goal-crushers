const createCalendar = () => {

    const getDateArray = (start, end) => {
        let startDate = new Date(start);
        const startDateMil = Date.parse(startDate);
        const startDateOffset = startDate.getTimezoneOffset() * 60000;
        startDate = new Date((startDateMil + startDateOffset));
        
        let endDate = new Date(end)
        const endDateMil = Date.parse(endDate);
        const endDateOffset = endDate.getTimezoneOffset() * 60000;
        endDate = new Date((endDateMil + endDateOffset));
        
        const timePeriod = (Date.parse(endDate) - Date.parse(startDate) )/ 86400000;
        console.log(timePeriod);
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
        return dateArray.sort((a, b) => a.dayInd - b.dayInd);
    }

    getDateArray('2021-12-01', '2022-11-30');
    
    
    return(
        <>
        
        </>
    )
}

export default createCalendar;