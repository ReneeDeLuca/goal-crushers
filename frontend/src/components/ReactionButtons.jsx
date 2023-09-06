/* eslint-disable react/prop-types */
import { useReactionAddedMutation } from "../apiSlices/goalApiSlice";
import { toast } from "react-toastify";

const reactionEmoji = {
  thumbsUp: "👍",
  bicep: "💪🏽",
  heart: "❤️",
  fire: "🔥",
  star: "⭐️",
};

const GoalReactionButtons = ({ goal }) => {
  const [addReaction] = useReactionAddedMutation();

  const reactionClickedHandler = async (name) => {
    //name is the reaction name passed into the click handler from the name of the emoji the button is mapped from
    try {
      const res = await addReaction({
        id: goal._id,
        reaction: name,
      }).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const goalReactionButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      let buttonCount = 0;
      switch (name) {
        case "thumbsUp":
          buttonCount = goal.thumbsUp;
          break;
        case "bicep":
          buttonCount = goal.bicep;
          break;
        case "heart":
          buttonCount = goal.heart;
          break;
        case "fire":
          buttonCount = goal.fire;
          break;
        case "star":
          buttonCount = goal.star;
          break;
      }

      return (
        <li
          className="border border-indigo-600 rounded-sm px-1 mx-1"
          key={name}
        >
          <button
            key={name}
            type="button"
            className="muted-button reaction-button"
            onClick={() => reactionClickedHandler(name)}
          >
            {buttonCount} {emoji}
          </button>
        </li>
      );
    }
  );

  return <ul className="grid grid-cols-5 gap-2">{goalReactionButtons}</ul>;
};

export default GoalReactionButtons;
