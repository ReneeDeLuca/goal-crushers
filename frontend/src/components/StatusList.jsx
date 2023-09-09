/* eslint-disable react/prop-types */
import { useGetAllStatusQuery } from "../apiSlices/statusApiSlice";
import { toast } from "react-toastify";
import Status from "./Status";
import { useMemo } from "react";

const StatusList = () => {
  const {
    data: statuses = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllStatusQuery();

  const sortedStatuses = useMemo(() => {
    const sortedStatuses = statuses.slice();
    sortedStatuses.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedStatuses;
  }, [statuses]);

  let content;

  const RenderedStatus = ({ status }) => {
    return (
      <Status
        key={status._id}
        id={status._id}
        status={status}
        user={status.user}
        userName={status.userName}
        goalId={status.goalId}
        goalTitle={status.goalTitle}
        goalUser={status.goalUser}
        goalUserName={status.goalUserName}
        statusType={status.statusType}
        createdAt={status.createdAt}
      />
    );
  };

  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    content = (
      <ul role="list" className="divide-y divide-gray-100">
        {sortedStatuses.map((status) => (
          <RenderedStatus key={status._id + status.createdAt} status={status} />
        ))}
      </ul>
    );
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  }

  return (
    <section className="statusList min-w-[450px] overflow-auto">
      <section className="flex flex-row min-w-full my-6 justify-evenly items-center">
        {content}
      </section>
    </section>
  );
};

export default StatusList;
