import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
    },
    numOfReviews: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
