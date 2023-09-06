import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  },
  likes: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

//MongoDB Collection named here - will give lowercase plural of name 
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
