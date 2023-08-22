import CalendarHeader from "./CalendarHeader";
import CreateCalendar from "./CreateCalendar";

const Goal = ({goal}) => {
    
    const handleGoalUpdate = () => {
        console.log('update goal');
    }

    return (
        <section id="goal-container">
            <section className="goal-info">
                <div className="basis-1/2 items-baseline">
                    <h2 className='text-xl align-bottom items-start font-bold text-gray-600'>{`${goal.title}`}</h2>
                </div>
                <div className="basis-1/2 text-end my-auto justify-end">
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
            <section id='calendar-chart' className='flex-row mx-auto pt-1'>
                <div className='calendar-label basis-1/5'>
                    <CalendarHeader 
                        key={goal._id}
                        id={goal._id}
                        createdAt={goal.createdAt}
                        endDate={goal.endDate}
                    />
                </div>
                <div className='basis-4/5'>
                    
                    <CreateCalendar 
                        key={goal._id}
                        id={goal._id}
                        createdAt={goal.createdAt}
                        endDate={goal.endDate}
                        data={goal.completionData}/>

                </div>
            </section>
            <section className="goal-meta-data">
                <div className="min-w-full">
                    <ul className="inline-flex min-w-full justify-around">
                        <li className="flex flex-col basis-1/2 text-start"> 
                            <span className='text-xs text-gray-600'>{`Created on: ${goal.createdAt}`}</span>
                            <span className='text-xs text-gray-600'>{`Ends on: ${goal.endDate}`}</span>
                        </li>
                        <li className="flex flex-col basis-1/2 text-end">
                            <span className='text-xs text-gray-600'>{goal.isPublic ? `Public` : `Private`}</span>
                        <a href='/deleteGoal'>
                        <span className='text-xs text-gray-600'>Delete Goal?</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Goal;