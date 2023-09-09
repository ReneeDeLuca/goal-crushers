import FormContainer from "./FormContainer";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {!userInfo ? (
        <FormContainer className="flex min-h-full flex-1 flex-col justify-center px-6 py-6">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="my-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome to Serial Crushers!
              </h2>
              <div className="divide-y divide-slate-400">
                <div className="py-1"></div>
                <div className="py-1"></div>
              </div>
              <h3 className="text-center my-4 text-l font-bold leading-9 tracking-tight text-gray-600">
                Create, track, and crush your goals with a simple, easy to use
                interface.
              </h3>
              <div className="divide-y divide-slate-400">
                <div className="py-1"></div>
                <div className="py-1"></div>
              </div>
              <>
                <section className="sm:mx-auto sm:w-full sm:max-w-sm my-4 inline-flex items-center justify-center">
                  <Link to="/login" className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign In
                    </button>
                  </Link>

                  <Link to="/register" className="ml-3 hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Sign Up
                    </button>
                  </Link>
                </section>
              </>
            </div>
          </div>
        </FormContainer>
      ) : (
        <>
          <Dashboard />
        </>
      )}
    </>
  );
};

export default Hero;
