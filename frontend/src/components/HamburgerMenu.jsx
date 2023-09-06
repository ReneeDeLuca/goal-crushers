/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../apiSlices/userApiSlice";
import { useLogoutMutation } from "../apiSlices/mainApiSlice";
import { logout } from "../apiSlices/authSlice";
import { toast } from "react-toastify";

export default function HamburgerMenu({ userId }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleHamburgerClick = () => {
    if (hamburgerOpen) {
      document.getElementById("menu-btn").classList.remove("open");
      document.getElementById("menu").classList.remove("flex");
      document.getElementById("menu").classList.add("hidden");
    } else {
      document.getElementById("menu-btn").classList.add("open");
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("menu").classList.add("flex");
    }
    setHamburgerOpen(!hamburgerOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let content;

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  const [userLogout] = useLogoutMutation();

  const logoutClickedHandler = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    toast.error(error?.data?.message || error.error);
  } else if (isSuccess) {
    content = (
      <ul
        id="menu"
        className="absolute flex-col items-end hidden self-end py-8 mt-10 space-y-2 font-bold sm:self-center right-6 px-8 drop-shadow-md origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      >
        <li>
          <span className="text-gray-700 hover:text-darkGrayishBlue">
            You are signed in as:
          </span>
        </li>
        <li>
          <span className="text-gray-900 hover:text-darkGrayishBlue">
            {user.name}
          </span>
        </li>
        <li>
          <span className="text-gray-700 hover:text-darkGrayishBlue">
            {user.email}
          </span>
        </li>

        <li className="divide-y divide-slate-400">
          <div className="py-1"></div>
          <div className="py-1"></div>
        </li>

        <li>
          <Link to="/" className="text-gray-700 hover:text-darkGrayishBlue">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/feed" className="text-gray-700 hover:text-darkGrayishBlue">
            Feed
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/:${user._id}`}
            className="text-gray-700 hover:text-darkGrayishBlue"
          >
            Your Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-gray-700 hover:text-darkGrayishBlue"
          >
            Settings
          </Link>
        </li>
        <li className="divide-y divide-slate-400">
          <div className="py-1"></div>
          <div className="py-1"></div>
        </li>
        <li>
          <span
            className="text-gray-700 hover:text-darkGrayishBlue cursor-pointer"
            onClick={logoutClickedHandler}
          >
            Logout
          </span>
        </li>
      </ul>
    );
  }

  return (
    <>
      <span className="m-auto">
        {/* Hamburger Icon */}
        <button
          id="menu-btn"
          className="block hamburger items-center rounded-md bg-indigo-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleHamburgerClick}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </span>
      {/* Hamburger Menu */}
      <div>
        <>{content}</>
      </div>
    </>
  );
}
