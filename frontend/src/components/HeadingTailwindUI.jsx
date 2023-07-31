import { useState } from "react";

export default function HeaderTW() {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleHamburgerClick = () => {
    if (hamburgerOpen) {
      document.getElementById('menu-btn').classList.remove('open');
      document.getElementById('menu').classList.remove('flex');
      document.getElementById('menu').classList.add('hidden');
    } else {
      document.getElementById('menu-btn').classList.add('open');
      document.getElementById('menu').classList.remove('hidden');
      document.getElementById('menu').classList.add('flex');
    }
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <>
      { /* Navbar */}
      <nav className="relative container mx-auto p-6">
        { /* Flex container */}
        <div className="flex items-center justify-between">
          { /* Logo and Name */}
        </div>
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              GoalSense
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </span>

            <span className="ml-3 hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Sign Up
              </button>
            </span>

            <span className="ml-3">
              {/* Hamburger Icon */}
              <button id="menu-btn" className="block hamburger items-center rounded-md bg-indigo-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleHamburgerClick}
              >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
            </span>


            {/* Hamburger Menu */}
            <div>
              <div id="menu" className="absolute flex-col items-end hidden self-end py-8 mt-10 space-y-2 font-bold bg-white sm:self-center right-6 px-2 drop-shadow-md">
                <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Dashboard</a>
                <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Feed</a>
                <a href="/profile" className="text-gray-700 hover:text-darkGrayishBlue">Profile</a>
                <a href="#" className="text-gray-700 hover:text-darkGrayishBlue">Settings</a>
                <a href="/logout" className="text-gray-700 hover:text-darkGrayishBlue">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav >
    </>
  );
}
