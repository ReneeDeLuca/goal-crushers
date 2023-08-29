/* eslint-disable react/prop-types */
import { useReactionAddedMutation } from "../apiSlices/goalApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const reactionEmoji = {
  thumbsUp: "👍",
  bicep: "💪🏽",
  heart: "❤️",
  fire: "🔥",
  star: "⭐️",
};

const GoalReactionButtons = ({ goal }) => {
  const [reactions, setReactions] = useState(goal.reactions);

  const [addReaction] = useReactionAddedMutation();

  const reactionClickedHandler = async (e) => {
    setReactions(goal.reactions[e.target.text] + 1);
    try {
      const res = await addReaction({
        id: goal._id,
        reactions: reactions,
      }).unwrap();
      console.log(res);
      toast.success(`${e.target.text}s updated successfully`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const goalReactionButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      return (
        <li key={name}>
          <button
            key={name}
            type="button"
            className="muted-button reaction-button"
            onClick={reactionClickedHandler}
          >
            {emoji} {goal.reactions[name]}
          </button>
        </li>
      );
    }
  );

  return <ul className="grid grid-cols-5 gap-2">{goalReactionButtons}</ul>;
};

export default GoalReactionButtons;
