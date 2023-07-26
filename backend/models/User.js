import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true,
    required: true, 
  },
  email: { 
    type: String, 
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  aboutMe: {
    type: String,
    required: false,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },  
}, {
  timestamps: true,
});

// Password hash middleware.

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper method for validating user's password.

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;