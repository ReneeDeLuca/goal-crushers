import CalendarHeader from "./CalendarHeader";
import CreateCalendar from "./CreateCalendar";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const Goal = ({goal}) => {
    
    const handleGoalUpdate = () => {
        console.log('update goal');
    }

    const formatEndDate = format(new Date(goal.endDate), 'P')

    return (
        <section id='goal-container' className='md:max-h-96'>
            <section className="goal-info">
                <div className="basis-1/2 pt-8 items-baseline">
                    <Link to={`/goal/${goal._id}`}>
                    <h2 className='text-xl underline align-bottom items-start font-bold text-gray-600'>{`${goal.title}`}</h2>
                    </Link>
                </div>
                <div className="basis-1/2 text-end py-4 my-auto justify-end">
                    <span className="flex-row items-end min-w-full justify-around">
                        <button
                            type="button"
                            className="inline-flex basis-1/3 text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGoalUpdate}
                        >
                            Update Goal
                        </button>        
                        
                    </span>
                </div>
            </section>
            <section id='calendar-chart' className='md:overflow-y-auto pr-4 flex-row pt-1'>
                <div className='calendar-label mr-6 ml-4 basis-1/5'>
                    <CalendarHeader 
                        key={goal._id}
                        id={goal._id}
                        createdAt={goal.createdAt}
                        endDate={goal.endDate}
                    />
                </div>
                <div className='basis-3/5'>
                    
                    <CreateCalendar 
                        key={goal._id}
                        id={goal._id}
                        createdAt={goal.createdAt}
                        endDate={goal.endDate}
                        data={goal.completionData}/>

                </div>
                <div>
                    <section className='basis-1/5 calendar-label'>
                    </section>
                </div>
            </section>
            <section className="goal-meta-data">
                <div className="min-w-full">
                    <ul className="flex-col min-w-full justify-around p-2">
                        <li className="flex flex-row basis-1/2 mb-1"> 
                            <span className='text-xs text-gray-600 text-start basis-1/4'>Created: </span>
                            {<TimeAgo timestamp={goal.createdAt} />}
                            <span className='text-xs text-gray-600 text-end pr-2 basis-1/2'>{goal.isPublic ? `Public` : `Private`}</span>
                        </li>
                        <li className="flex flex-row basis-1/2 mt-1">
                            <span className='text-xs text-gray-600 basis-1/4 text-start'>Ends on: </span>
                            <span className='text-xs text-gray-800 basis-1/4 text-start'>{`${formatEndDate}`}</span>
                            <a className='text-xs text-gray-600 basis-1/2 text-end pr-2' href='/deleteGoal'>
                                Delete Goal?
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Goal;