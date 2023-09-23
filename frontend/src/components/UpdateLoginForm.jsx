import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateLoginMutation } from "../apiSlices/userApiSlice";
import { setCredentials } from "../apiSlices/authSlice";
import { Link } from "react-router-dom";

const UpdateLoginForm = () => {
  // Update Login Button Show/Hide

  const [showUpdateLogin, setShowUpdateLogin] = useState(false);

  const handleUpdateClick = () => {
    if (showUpdateLogin) {
      document
        .getElementById("updateLoginOutline")
        .classList.remove("updateClick");
    } else {
      document
        .getElementById("updateLoginOutline")
        .classList.add("updateClick");
    }
    setShowUpdateLogin(!showUpdateLogin);
  };

  const cancelUpdateLogin = () => {
    document
      .getElementById("updateLoginOutline")
      .classList.remove("updateClick");
    setShowUpdateLogin(!showUpdateLogin);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateSettings] = useUpdateLoginMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateSettings({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate("/settings");
        toast.success("Login settings updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="grid grid-cols-1">
      <span className="flex card mt-4 mx-auto md:px-5 md:pb-0 md:pt-5 items-start">
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleUpdateClick}
        >
          Update Login Settings
        </button>
      </span>
      <div
        id="updateLoginOutline"
        className="justify-items-center rounded-md border-indigo-600"
      >
        {" "}
        {showUpdateLogin ? (
          <table className="col-span-1 mx-auto">
            <tbody>
              <tr className="mt-2">
                <td className="flex card mx-auto md:px-5 items-start">
                  <section className="flex min-h-full flex-1 flex-col px-6">
                    <div className="mx-auto w-full sm:max-w-sm">
                      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {" "}
                        Update Login Settings
                      </h2>
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form
                        id="loginForm"
                        className="space-y-6"
                        action="#"
                        onSubmit={submitLoginHandler}
                      >
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-offset-0 ring-gray-300 placeholder:text-gray-400 resize-none focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-indigo-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-offset-0 ring-gray-300 placeholder:text-gray-400 resize-none focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-indigo-600"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-offset-0 ring-gray-300 placeholder:text-gray-400 resize-none focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-indigo-600"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Confirm Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-offset-0 ring-gray-300 placeholder:text-gray-400 resize-none focus:ring-2  focus:ring-indigo-600 sm:text-sm sm:leading-6 caret-indigo-600"
                            />
                          </div>
                        </div>
                        <div className="mt-5 flex justify-evenly">
                          <span className=" sm:block">
                            <Link to="/">
                              <button
                                type="submit"
                                id="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onSubmit={submitLoginHandler}
                              >
                                Submit
                              </button>
                            </Link>
                          </span>
                          <span className=" sm:block">
                            <button
                              type="button"
                              id="cancel"
                              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={cancelUpdateLogin}
                            >
                              Cancel
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </section>
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}{" "}
      </div>
    </section>
  );
};

export default UpdateLoginForm;
