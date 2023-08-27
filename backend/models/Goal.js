import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  datesCompleted: {
    type: [String],
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
  reactions: { 
    thumbsUp: Number, 
    bicep: Number, 
    heart: Number, 
    fire: Number, 
    star: Number,
  },
  endDate: {
    type: Date,
		required: true,
  },
  comments: [{ body: String, date: Date, user: String }],
},
{
  timestamps: true,
});

//MongoDB Collection named here - will give lowercase plural of name 
const Goal = mongoose.model("Goal", GoalSchema);

export default Goal;