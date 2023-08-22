import GoalList from "./GoalList"
import { useSelector } from "react-redux"



const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);    

    return (
        <>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>{`${userInfo.name}'s Dashboard`}</h1>
        </div>
        <section className='flex flex-col flex-1 mt-10 mx-auto md:flex-row items-start'>
            <GoalList />
        </section>
        </>
    )
}

export default Dashboard