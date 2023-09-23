import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  secureUrl: {
    type: String,
    required: true,
  },
    strResult: {
    type: String,
    required: true,
    },
},
{ timestamps: true});

//MongoDB Collection named here - will give lowercase plural of name 
const Image = mongoose.model("Image", ImageSchema);

export default Image;