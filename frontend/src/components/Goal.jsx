import CreateCalendar from "./CreateCalendar";

const Goal = ({goal}) => {
    
    const handleGoalUpdate = () => {
        console.log('update goal');
    }

    return (
        <section id="goal-container">
            <section className="goal-info">
                <div className="basis-1/2 items-baseline">
                    <h2 className='text-xl mt-3 align-bottom items-start font-bold text-gray-600'>{`${goal.title}`}</h2>
                </div>
                <div className="basis-1/2 mt-3 text-end items-baseline justify-end">
                    <span className="flex-row items-end min-w-full justify-around">
                        <button
                            type="button"
                            className="inline-flex basis-1/3 mr-3 text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGoalUpdate}
                        >
                            Update Goal
                        </button>        
                        <a href='/deleteGoal'>
                            <button
                                type="button"
                                className="inline-flex basis-1/3 ml-3 text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Delete Goal
                            </button>
                        </a>
                    </span>
                </div>
            </section>
            <div id='calendar-chart' className='flex-row max-w-full overflow-y-hidden overflow-x-auto  pt-1 min-h-full text-start'>
                <div className='calendar-label'>
                    <table className="days-of-week">
                        <thead>
                            <tr className='table-head-row text-xs'>
                                <th className='calendar-label'>
                                    <span className='sr-only'>Day of the Week</span>
                                </th>
                                <th className='days'>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td className="days">
                                    <span className='sr-only'>Sunday</span>
                                    <span className='hidden day-label text-gray-600'>Sun</span>
                                </td>                               
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Monday</span>
                                    <span className='day-label text-gray-600'>Mon</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Tuesday</span>
                                    <span className='hidden day-label text-gray-600'>Tue</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Wednesday</span>
                                    <span className='day-label text-gray-600'>Wed</span>
                                </td>                                
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Thursday</span>
                                    <span className='hidden day-label text-gray-600'>Thr</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Friday</span>
                                    <span className='day-label text-gray-600'>Fri</span>
                                </td>                                
                            </tr>
                            <tr>
                                <td className="days">
                                    <span className='sr-only'>Saturday</span>
                                    <span className='hidden day-label text-gray-600'>Sat</span>
                                </td>                                
                            </tr> 
                        </tbody>
                    </table>
                </div>
                <div className='max-w-fit shrink-0 overflow-y-hidden overflow-x-auto'>
                    
                    <CreateCalendar 
                        key={goal._id}
                        id={goal._id}
                        createdAt={goal.createdAt}
                        endDate={goal.endDate}
                        data={goal.completionData}/>

                </div>
            </div>
            <section className="goal-meta-data">
                <div className="min-w-full">
                    <ul className="inline-flex min-w-full justify-around">
                        <li className="basis-1/3 text-start"> 
                            <span className='text-xs text-gray-600'>{`Created on: ${goal.createdAt}`}</span>
                        </li>
                        <li className="basis-1/3 text-center">
                            <span className='text-xs text-gray-600'>{`Ends on: ${goal.endDate}`}</span>
                        </li>
                        <li className="basis-1/3 text-end">
                            <span className='text-xs text-gray-600'>{goal.isPublic ? `Public` : `Private`}</span>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Goal;