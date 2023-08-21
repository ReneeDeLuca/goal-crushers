import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const CreateCalendar = (goal) => {
    
    return(
        <>
        <table className="calendar-graph">
            <caption className='sr-only'>Goal activity</caption>
                <CalendarHeader
                    key={goal._id}
                    id={goal._id}
                    createdAt={goal.createdAt}
                    endDate={goal.endDate}
                />
                
                <CalendarBody 
                    key={goal._id}
                    id={goal._id}
                    data={goal.completionData}
                />
                
        </table>

        </>
    )
}

export default CreateCalendar;