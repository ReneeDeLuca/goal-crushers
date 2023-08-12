import AddGoal from "./AddGoal"
import Goal from "./Goal"

const Dashboard = () => {
    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        </div>
        <section className= 'flex flex-row flex-1 mt-10 mx-auto'>
            <section className='flex flex-col items-start'>
                <Goal />
            </section>
            <section className='flex flex-col items-center'>
                <AddGoal />
            </section>
        </section>
        </>
    )
}

export default Dashboard