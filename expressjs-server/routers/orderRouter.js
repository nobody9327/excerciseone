import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/empty",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const removedOrder = await Order.remove({ user: user._id });
    res.status(201).send();
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    console.log("user", user);
    const order = await Order.findOne({ user: user._id, _id: req.params.id });

    res.send(order);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const cartItems = req.body.orderItems;
    const user = req.user;

    if (cartItems.length == 0) {
      res.status(400).send({ message: "Cart is empty" });
    }

    const order = new Order({
      orderItems: cartItems,
      user: user._id,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  })
);

orderRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const orders =await Order.find({ user: user._id });

    res.send(orders);
  })
);

export default orderRouter;
