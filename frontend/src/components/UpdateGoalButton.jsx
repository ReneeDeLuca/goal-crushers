/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUpdateGoalDataMutation } from "../apiSlices/goalApiSlice";
import { toast } from "react-toastify";
import { useAddStatusMutation } from "../apiSlices/statusApiSlice";

const UpdateGoalDataButton = ({ goal }) => {
  const [updateGoalData, { isLoading }] = useUpdateGoalDataMutation();
  const [addStatus] = useAddStatusMutation();

  const [datesCompleted, setDatesCompleted] = useState(goal.datesCompleted);

  const onDateUpdated = () =>
    setDatesCompleted([...datesCompleted, Date.now()]);

  const onUpdateGoalClicked = async () => {
    try {
      const dateOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const res = await updateGoalData({
        id: goal._id,
        date: new Date().toLocaleDateString("en", dateOptions),
      }).unwrap();
      if (goal.isPublic) {
        await addStatus({
          user: goal.user,
          userName: goal.userName,
          goalId: goal._id,
          goalTitle: goal.title,
          statusType: "goal progress",
        }).unwrap();
      }
      console.log(res);
      setDatesCompleted([...datesCompleted, res.date]);
      toast.success("Goal updated successfully");
      onDateUpdated();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <span className="flex-row items-end min-w-full justify-around">
      <button
        id="update-goal-button"
        type="button"
        className="inline-flex basis-1/3 text-center items-end rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onUpdateGoalClicked}
      >
        {isLoading ? "Updating..." : "Update Goal"}
      </button>
    </span>
  );
};

export default UpdateGoalDataButton;
