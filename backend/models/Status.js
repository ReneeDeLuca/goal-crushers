import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  statusType: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  goalTitle: {
    type: String,
  },
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
  },
  goalUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  goalUserName: {
    type: String,
  },
},
{ timestamps: true});

//MongoDB Collection named here - will give lowercase plural of name 
const Status = mongoose.model("Status", StatusSchema);

export default Status;