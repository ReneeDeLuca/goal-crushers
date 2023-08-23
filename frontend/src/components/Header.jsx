import { useSelector } from "react-redux";
import HamburgerMenu from "./HamburgerMenu";


export default function Header() {

  const { userInfo } = useSelector((state) => state.auth);

  

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
          <div className="mt-5 flex mx-4 lg:ml-4 lg:mt-0">
            {(!userInfo) ? (
              <>
                <span className="hidden sm:block">
                  <a href='/login'>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign In
                  </button>
                  </a>
                </span>

                <span className="ml-3 hidden sm:block">
                  <a href='/register'>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Sign Up
                  </button>
                  </a>
                </span>
              </>
            ) : (
              <>
                <div className="min-w-0 flex-1 inline-flex">
                  <div className='mr-2'>
                    <img className="h-10 w-10 rounded-full ring-2 ring-white" src="/4900_8_04_catalyststuff.jpg" alt="" />
                  </div>
                  <span className="font-bold mx-2 leading-7 text-gray-900 sm:truncate sm:tracking-tight">
                    {userInfo.name}</span>
                  <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  </div>
                </div>
                <HamburgerMenu />
              </>
            )}
          </div>
        </div>
      </nav >
    </>
  );
}
