import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useAddGoalMutation } from "../apiSlices/goalApiSlice";
import { useSelector } from "react-redux";

const AddGoal = () => {
  // Add Goal Button Show/Hide

  const [showAddGoal, setShowAddGoal] = useState(false);

  const handleAddClick = () => {
    if (showAddGoal) {
      document.getElementById("addGoalOutline").classList.remove("addClick");
    } else {
      document.getElementById("addGoalOutline").classList.add("addClick");
    }
    setShowAddGoal(!showAddGoal);
  };

  const cancelAddGoal = () => {
    document.getElementById("addGoalOutline").classList.remove("addClick");
    setShowAddGoal(!showAddGoal);
  };

  // Add Goal Form
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [reactions, setReactions] = useState({
    thumbsUp: 0,
    bicep: 0,
    heart: 0,
    fire: 0,
    star: 0,
  });

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo._id;

  const [addGoal, { isLoading }] = useAddGoalMutation();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onEndDateChanged = (e) => setEndDate(e.target.value);

  const canSave = [title, endDate].every(Boolean) && !isLoading;

  const togglePublic = () => setIsPublic(!isPublic);

  const submitHandler = async () => {
    if (canSave) {
      try {
        const res = await addGoal({
          title,
          endDate,
          isPublic,
          reactions,
          user,
        }).unwrap();
        console.log(res);
        setTitle("");
        setEndDate("");
        setIsPublic();
        setReactions();
        toast.success("Goal added successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <section className="flex-initial max-w-sm min-h-full flex-col justify-left px-6 py-2 lg:px-8">
        <span>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleAddClick}
          >
            Add Goal
          </button>
        </span>
        <div id="addGoalOutline" className="rounded-md border-indigo-600">
          {" "}
          {showAddGoal ? (
            <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
              <h1 className="text-xl font-bold text-gray-600">Add Goal</h1>

              <form onSubmit={submitHandler}>
                <div className="my-4 title">
                  <label htmlFor="title" className="mb-2">
                    Enter a Goal Title
                  </label>
                  <input
                    id="title"
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
                    End Date
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
                  <label htmlFor="isPublic" className="mb-2 mr-4">
                    Make your goal public?
                  </label>
                  <input
                    id="isPublic"
                    type="checkbox"
                    defaultChecked={isPublic}
                    aria-label="Make your goal public?"
                    onChange={togglePublic}
                  ></input>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                  <span className=" mr-2 sm:block">
                    <button
                      type="button"
                      id="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isLoading || !canSave}
                      onClick={submitHandler}
                    >
                      {isLoading ? "Loading…" : "Submit"}
                    </button>
                  </span>
                  <span className="ml-2 sm:block">
                    <button
                      type="button"
                      id="cancel"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={cancelAddGoal}
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

export default AddGoal;
