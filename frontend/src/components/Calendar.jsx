function Calendar() {

    const createCalendar = () => {
        for (let i = 0; i < 7; i++) {
            let row = document.createElement('tr');
            row.className = `index-${i}`;
            document.getElementById('date-grid')[0].appendChild(row);
            for (let j = 0; j < 53; j++) {
                let cell = document.createElement('td');
                if(j === 0 || j === 1){
                    cell.className = `calendar-label index-${j}`;
                    row.appendChild(cell);
                    let label = document.createElement('span');
                    label.className = 'sr-only';
                } else {
                cell.className = `goal-cal-day index-${j}`;
                row.appendChild(cell);
                }
            }
        }
    }
    const handleGoalUpdate = () => {
        console.log('update goal');
    }

    return (
        <section className="goal-container">
            <section className="goal-info">
                <div className="basis-3/4 items-baseline">
                    <h2 className='text-xl mt-3 align-bottom items-start font-bold text-gray-600'>Goal Title</h2>
                </div>
                <div className="basis-1/4 mt-3 text-end items-baseline justify-end">
                    <span className="items-end">
                        <button
                            type="button"
                            className="inline-flex text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGoalUpdate}
                        >
                            Update Goal
                        </button>
                    </span>
                </div>
            </section>
            <div id='calendar-chart' className='flex-row max-w-full overflow-y-hidden overflow-x-auto  pt-1 min-h-full text-start'>
            <div className='calendar-label'>
                <table>
                            <thead>
                            <tr className='table-head-row text-xs'>
                            <th className='days'>
                                    <span className='sr-only'>Day of the Week</span>
                                </th>
                                <th className='days'>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr className="row-0">
                                <td className="calendar-label">
                                    <span className='sr-only'>Sunday</span>
                                    <span className='hidden day-label text-gray-600'>Sun</span>
                                </td>
                                <td className="calendar-label"></td>
                                
                            </tr>
                            <tr className="row-1">
                                <td className="calendar-label">
                                    <span className='sr-only'>Monday</span>
                                    <span className='day-label text-gray-600'>Mon</span>
                                </td>
                                <td className="calendar-label"></td>
                                
                            </tr>
                            <tr className="row-2">
                                <td className="calendar-label">
                                    <span className='sr-only'>Tuesday</span>
                                    <span className='hidden day-label text-gray-600'>Tue</span>
                                </td>
                                <td className="calendar-label"></td>
                            </tr>
                            <tr className="row-3">
                                <td className="calendar-label">
                                    <span className='sr-only'>Wednesday</span>
                                    <span className='day-label text-gray-600'>Wed</span>
                                </td>
                                <td className="calendar-label"></td>
                                
                            </tr>
                            <tr className="row-4">
                                <td className="calendar-label">
                                    <span className='sr-only'>Thursday</span>
                                    <span className='hidden day-label text-gray-600'>Thr</span>
                                </td>
                                <td className="calendar-label"></td>
                                
                            </tr>
                            <tr className="row-5">
                                <td className="calendar-label">
                                    <span className='sr-only'>Friday</span>
                                    <span className='day-label text-gray-600'>Fri</span>
                                </td>
                                
                            </tr>
                            <tr className="row-6">
                                <td className="calendar-label">
                                    <span className='sr-only'>Saturday</span>
                                    <span className='hidden day-label text-gray-600'>Sat</span>
                                </td>
                                <td className="calendar-label"></td>
                                
                            </tr> 
                            </tbody>
                            </table>
                            </div>
                            <div className='max-w-fit shrink-0 overflow-y-hidden overflow-x-auto'>
                    <table className="calendar-graph">
                        <caption className='sr-only'>Goal activity</caption>
                        <thead>
                            <tr className='table-head-row text-xs'>
                                
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>January</span>
                                    <span aria-hidden='true'>Jan</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>February</span>
                                    <span aria-hidden='true'>Feb</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>March</span>
                                    <span aria-hidden='true'>Mar</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>April</span>
                                    <span aria-hidden='true'>Apr</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>May</span>
                                    <span aria-hidden='true'>May</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>June</span>
                                    <span aria-hidden='true'>Jun</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>July</span>
                                    <span aria-hidden='true'>Jul</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>August</span>
                                    <span aria-hidden='true'>Aug</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>September</span>
                                    <span aria-hidden='true'>Sep</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>October</span>
                                    <span aria-hidden='true'>Oct</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={4}>
                                    <span className='sr-only'>November</span>
                                    <span aria-hidden='true'>Nov</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>December</span>
                                    <span aria-hidden='true'>Dec</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="date-grid">
                            {createCalendar()}
                        </tbody>
                        
                    </table>
                </div>
            </div>
            <section className="goal-meta-data">
                <div className="min-w-full">
                    <ul className="inline-flex min-w-full justify-around">
                        <li className="basis-1/3 text-start"> 
                            <span className='text-xs text-gray-600'>Created on: </span>
                        </li>
                        <li className="basis-1/3 text-center">
                            <span className='text-xs text-gray-600'>Ends on: </span>
                        </li>
                        <li className="basis-1/3 text-end">
                        <span className='text-xs text-gray-600'>Public/Private</span>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Calendar;