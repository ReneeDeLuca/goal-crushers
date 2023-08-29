/* eslint-disable react/prop-types */
import { useState } from "react";
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";
import { useDeleteGoalMutation } from "../apiSlices/goalApiSlice";
import { Navigate } from "react-router-dom";

const DeleteGoal = ({ goal }) => {
  // Delete Goal Button Show/Hide

  const [showDeleteGoal, setShowDeleteGoal] = useState(false);

  const handleDeleteClick = () => {
    if (showDeleteGoal) {
      document.getElementById("deleteGoalOutline").classList.remove("border-2");
    } else {
      document.getElementById("deleteGoalOutline").classList.add("border-2");
    }
    setShowDeleteGoal(!showDeleteGoal);
  };

  const cancelDeleteGoal = () => {
    document.getElementById("deleteGoalOutline").classList.remove("border-2");
    setShowDeleteGoal(!showDeleteGoal);
  };

  // Delete Goal Form

  const id = goal._id;

  const [deleteGoal, { isLoading }] = useDeleteGoalMutation();

  const submitHandler = async () => {
    <Navigate to="/" />;
    try {
      const res = await deleteGoal(id).unwrap();
      console.log(res);
      toast.success("Goal deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <section className="flex max-w-sm min-h-full flex-col px2 py-2">
        <span className="justify-start">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleDeleteClick}
          >
            Delete Goal
          </button>
        </span>
        <div id="deleteGoalOutline" className="rounded-md border-red-800 mt-4">
          {" "}
          {showDeleteGoal ? (
            <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
              <h1 className="text-xl font-bold text-red-800">
                Are you sure you want to delete this goal?
              </h1>
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className=" mr-2 sm:block">
                  <button
                    type="submit"
                    id="submit"
                    className="inline-flex items-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                    onClick={submitHandler}
                  >
                    {isLoading ? "Loading…" : "Yes, delete this goal"}
                  </button>
                </span>
                <span className="ml-2 sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={cancelDeleteGoal}
                  >
                    No, keep this goal
                  </button>
                </span>
              </div>
            </FormContainer>
          ) : null}{" "}
        </div>
      </section>
    </>
  );
};

export default DeleteGoal;
