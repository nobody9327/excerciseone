import mongoose from "mongoose";
import User from "./userModel.js";

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const ShippingAdress = mongoose.model("ShippingAddress", shippingAddressSchema);

export default ShippingAdress;
