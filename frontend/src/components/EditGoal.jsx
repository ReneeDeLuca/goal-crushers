/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";
import { useUpdateGoalMutation } from "../apiSlices/goalApiSlice";

const EditGoal = ({ goal }) => {
  // Edit Goal Button Show/Hide

  const [showEditGoal, setShowEditGoal] = useState(false);

  const handleEditClick = () => {
    if (showEditGoal) {
      document.getElementById("editGoalOutline").classList.remove("border-2");
    } else {
      document.getElementById("editGoalOutline").classList.add("border-2");
    }
    setShowEditGoal(!showEditGoal);
  };

  const cancelEditGoal = () => {
    document.getElementById("editGoalOutline").classList.remove("border-2");
    setShowEditGoal(!showEditGoal);
  };

  // Edit Goal Form

  const [endDate, setEndDate] = useState(goal.endDate);
  const [title, setTitle] = useState(goal.title);
  const [isPublic, setIsPublic] = useState(goal.isPublic);
  const id = goal._id;

  const navigate = useNavigate();

  const [updateGoal, { isLoading }] = useUpdateGoalMutation();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onEndDateChanged = (e) => setEndDate(e.target.value);

  const togglePublic = () => setIsPublic(!isPublic);

  const submitHandler = async () => {
    try {
      const res = await updateGoal({ id, title, endDate, isPublic }).unwrap();
      console.log(res);
      setTitle(goal.title);
      setEndDate(goal.endDate);
      setIsPublic(goal.isPublic);
      navigate(`/goal/:${goal._id}`);
      toast.success("Goal updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <section className="flex min-h-full flex-col px-2 py-2">
        <span className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleEditClick}
          >
            Edit Goal
          </button>
        </span>
        <div id="editGoalOutline" className="rounded-md border-indigo-600 mt-4">
          {" "}
          {showEditGoal ? (
            <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
              <h1 className="text-xl font-bold text-gray-600">Edit Goal</h1>

              <form onSubmit={submitHandler}>
                <div className="my-4 title">
                  <label className="mb-2">Update Goal Title</label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="Be as specific as you like."
                    value={title}
                    onChange={onTitleChanged}
                    aria-describedby="titleHelpBlock"
                  ></input>
                  <span className="text-xs text-gray-400">
                    Eg: Play guitar for 30 minutes every day for 1 year or Cook
                    at home today.
                  </span>
                </div>
                <hr />
                <div className="my-4 endDate">
                  <label htmlFor="endDate" className="mb-2">
                    Update End Date
                  </label>
                  <input
                    id="endDate"
                    className="block w-full rounded-md border-0 pt-0.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 align-middle focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="date"
                    min={`${new Date()}`}
                    value={endDate}
                    onChange={onEndDateChanged}
                  />
                </div>
                <hr />
                <div className="my-4 isPublic">
                  <label className="mb-2 mr-4">Make your goal public?</label>
                  <input
                    type="checkbox"
                    defaultChecked={isPublic}
                    aria-label="Make your goal public?"
                    onChange={togglePublic}
                  ></input>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                  <span className=" mr-2 sm:block">
                    <button
                      type="submit"
                      id="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isLoading}
                      onClick={submitHandler}
                    >
                      {isLoading ? "Loading…" : "Submit"}
                    </button>
                  </span>
                  <span className="ml-2 sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={cancelEditGoal}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </form>
            </FormContainer>
          ) : null}{" "}
        </div>
      </section>
    </>
  );
};

export default EditGoal;
