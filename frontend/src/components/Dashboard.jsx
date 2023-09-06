import GoalList from "./GoalList";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl underline font-bold text-gray-900">{`${userInfo.name}'s Goal Dashboard`}</h1>
      </div>
      <section className="container mx-auto mt-10">
        <GoalList userInfo={userInfo} />
      </section>
    </>
  );
};

export default Dashboard;
