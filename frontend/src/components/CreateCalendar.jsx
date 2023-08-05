const createCalendar = () => {
        const today = new Date();
        const startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 370);
        const pastYear = [];
        for (let i = 0; i < 371; i++) {
            pastYear.push({
                date: new Date(startDate),
                dayInd: startDate.getDay(),
                weekInd: Math.floor(i / 7),
                monthInd: startDate.getMonth(),
                yearInd: startDate.getFullYear(),
                day: startDate.getDate(),
            });
            startDate.setDate(startDate.getDate() + 1);
        }
        console.log(pastYear);
    
    
    return(
        <>
        
        </>
    )
}

export default createCalendar;