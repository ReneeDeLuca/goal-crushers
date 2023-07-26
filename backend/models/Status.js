const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  status: {
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
  likes: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
});

//MongoDB Collection named here - will give lowercase plural of name 
const Status = mongoose.model("Status", StatusSchema);

export default Status;