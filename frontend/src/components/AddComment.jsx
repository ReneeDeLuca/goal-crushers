/* eslint-disable react/prop-types */
import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useAddCommentMutation } from "../apiSlices/commentApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddComment = ({ goal }) => {
  // Add Comment Button Show/Hide

  const [showAddComment, setShowAddComment] = useState(false);

  const handleAddClick = () => {
    if (showAddComment) {
      document.getElementById("addCommentOutline").classList.remove("addClick");
    } else {
      document.getElementById("addCommentOutline").classList.add("addClick");
    }
    setShowAddComment(!showAddComment);
  };

  const cancelAddComment = () => {
    document.getElementById("addCommentOutline").classList.remove("addClick");
    setShowAddComment(!showAddComment);
  };

  // Add Comment Form

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const [text, setText] = useState("");
  const goalId = goal._id;

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onTextChanged = (e) => setText(e.target.value);

  const canSave = [text].every(Boolean) && !isLoading;

  const submitHandler = async () => {
    if (canSave) {
      try {
        const res = await addComment({
          text,
          userId,
          goalId,
        }).unwrap();
        console.log(res);
        setText("");
        cancelAddComment();
        toast.success("Comment added successfully");
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
        <div id="addCommentOutline" className="rounded-md border-indigo-600">
          {" "}
          {showAddComment ? (
            <FormContainer className="flex min-h-full flex-col justify-center px-6 py-6">
              <h1 className="text-xl font-bold text-gray-600">Add Goal</h1>

              <form onSubmit={submitHandler}>
                <div className="my-4 text">
                  <label htmlFor="text" className="mb-2">
                    Your comments are always public. Be kind.
                  </label>
                  <input
                    id="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    value={text}
                    onChange={onTextChanged}
                    aria-describedby="textHelpBlock"
                  ></input>
                </div>
                <hr />
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                  <span className=" mr-2 sm:block">
                    <Link to={`/goal/:${goalId}`}>
                      <button
                        type="button"
                        id="submit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={isLoading || !canSave}
                        onClick={submitHandler}
                      >
                        {isLoading ? "Loading…" : "Submit"}
                      </button>
                    </Link>
                  </span>
                  <span className="ml-2 sm:block">
                    <button
                      type="button"
                      id="cancel"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={cancelAddComment}
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

export default AddComment;
