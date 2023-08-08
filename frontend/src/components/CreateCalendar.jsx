import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const CreateCalendar = () => {
    
    return(
        <>
        <table className="calendar-graph">
            <caption className='sr-only'>Goal activity</caption>
                <CalendarHeader />
                
                <CalendarBody />
                
        </table>

        </>
    )
}

export default CreateCalendar;