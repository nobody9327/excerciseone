import express from "express";
import productRouter from "../routers/productRouter.js";
import mongoose from "mongoose";
import userRouter from "../routers/userRouter.js";
import dotenv from "dotenv";
import cartRouter from "../routers/cartRouter.js";
import shippingAddressRouter from "../routers/shippingAddressRouter.js";
import orderRouter from "../routers/orderRouter.js";
import uploadRouter from "../routers/uploadRouter.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://nobody:nobody@nobody9327.yrvrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  }
);

app.use("/api/uploads", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/shipping-address", shippingAddressRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const _dirname = path.resolve();
app.use("/api/resource/uploads", express.static(path.join(_dirname, "/uploads")));
app.get("/", (req, res) => {
  res.send("welcome to my expressjs server");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(8100, () => {
  console.log("Server is up and running at port 8100");
});
