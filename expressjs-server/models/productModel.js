import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numOfReviews: { type: Number, required: true },
    images: [{ name: { type: String }, url: { type: String } }],
    description: { type: String, default: ".", required: true },
    specification: { type: String, required: true },
    countInStock: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
