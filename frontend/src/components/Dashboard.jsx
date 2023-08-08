import AddGoal from "./AddGoal"
import Goal from "./Goal"

const Dashboard = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        </div>
        <AddGoal />
        
        <Goal />
        </>
    )
}

export default Dashboard