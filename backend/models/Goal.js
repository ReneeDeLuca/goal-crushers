import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completionData: {
    type: [{
      x : Date,
      value : Number,
    }],
    default: [{x : Date.now, value : 1}],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  endDate: {
    type: Date,
		required: true,
  },
},
{
  timestamps: true,
});

//MongoDB Collection named here - will give lowercase plural of name 
const Goal = mongoose.model("Goal", GoalSchema);

export default Goal;