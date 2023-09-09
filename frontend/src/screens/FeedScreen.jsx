import StatusList from "../components/StatusList";

const FeedScreen = () => {
  return (
    <main className="container">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">Recent Activity</h1>
      </div>
      <StatusList />
    </main>
  );
};

export default FeedScreen;
