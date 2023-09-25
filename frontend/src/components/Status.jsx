/* eslint-disable react/prop-types */
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";

const Status = ({ status }) => {
  let statusType = status.statusType;
  let user = status.user;
  let userName = status.userName;
  let goalId = status.goalId;
  let goalTitle = status.goalTitle;
  let goalUser = status.goalUser;
  let goalUserName = status.goalUserName;
  let createdAt = status.createdAt;
  let statusId = status._id;

  const { data: userData = {} } = useGetUserByIdQuery(user);

  let content;

  if (statusType === "new user") {
    return (content = (
      <li key={statusId} className="flex justify-between gap-x-6 py-5">
        <div className="flex basis-2/3 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`${userData.image}`}
            alt="user_image"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              A new Serial Crusher has entered the arena!
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Welcome{" "}
              <Link
                to={`/profile/:${user}`}
                className="font-bold text-indigo-600"
              >
                {" "}
                {userName}!
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 items-end">
          <p className="text-sm leading-6 text-gray-900">Updated:</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            <TimeAgo timestamp={createdAt} />
          </p>
        </div>
      </li>
    ));
  } else if (statusType === "new goal") {
    return (content = (
      <li key={statusId} className="flex justify-between gap-x-6 py-5">
        <div className="flex basis-2/3 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`${userData.image}`}
            alt="user_image"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link
                to={`/profile/:${user}`}
                className="font-bold text-indigo-600"
              >
                {userName}
              </Link>
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Added a new goal:{" "}
              <Link
                to={`/goal/:${goalId}`}
                className="font-bold text-indigo-600"
              >
                {goalTitle}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 items-end">
          <p className="text-sm leading-6 text-gray-900">Updated:</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            <TimeAgo timestamp={createdAt} />
          </p>
        </div>
      </li>
    ));
  } else if (statusType === "goal progress") {
    return (content = (
      <li key={statusId} className="flex justify-between gap-x-6 py-5">
        <div className="flex basis-2/3 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`${userData.image}`}
            alt="user_image"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link
                to={`/profile/:${user}`}
                className="font-bold text-indigo-600"
              >
                {userName}
              </Link>
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Made progress on their goal:{" "}
              <Link
                to={`/goal/:${goalId}`}
                className="font-bold text-indigo-600"
              >
                {goalTitle}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 items-end">
          <p className="text-sm leading-6 text-gray-900">Updated:</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            <TimeAgo timestamp={createdAt} />
          </p>
        </div>
      </li>
    ));
  } else if (statusType === "comment") {
    return (content = (
      <li key={statusId} className="flex justify-between gap-x-6 py-5">
        <div className="flex basis-2/3 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`${userData.image}`}
            alt="user_image"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link
                to={`/profile/:${user}`}
                className="font-bold text-indigo-600"
              >
                {userName}
              </Link>
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Commented on{" "}
              <Link to={`/profile/:${goalUser}`}>{`${goalUserName}'s`}</Link>{" "}
              goal:{" "}
              <Link
                to={`/goal/:${goalId}`}
                className="font-bold text-indigo-600"
              >
                {goalTitle}
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 items-end">
          <p className="text-sm leading-6 text-gray-900">Updated:</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            <TimeAgo timestamp={createdAt} />
          </p>
        </div>
      </li>
    ));
  }

  return { content };
};

export default Status;
