import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  goalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  },
  goalUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
