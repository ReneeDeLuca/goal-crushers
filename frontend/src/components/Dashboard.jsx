import AddGoal from "./AddGoal"

const Dashboard = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        </div>
        <AddGoal />
        </>
    )
}

export default Dashboard