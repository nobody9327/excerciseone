import express from "express";
import expressAsyncHandler from "express-async-handler";
import ShippingAdress from "../models/shippingAddressModel.js";
import { isAuth } from "../utils.js";

const shippingAddressRouter = express.Router();

shippingAddressRouter.post(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    // console.log("user", req.user);

    const currentAddress = await ShippingAdress.findOne({ user: user._id });
    // console.log("currentAddress", currentAddress);
    if (currentAddress) {
      currentAddress.fullName = req.body.fullName;
      currentAddress.address = req.body.address;
      currentAddress.city = req.body.city;
      currentAddress.postalCode = req.body.postalCode;
      currentAddress.country = req.body.country;
      // console.log("currentAddress", currentAddress);
      const updatedAddress = await currentAddress.save();
      res.send(updatedAddress);
    } else {
      const updatedAddress = await ShippingAdress.create({
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        user: user._id,
      });
      res.send(updatedAddress);
    }
  })
);


shippingAddressRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    // console.log("user", user);
    const shippingAddress = await ShippingAdress.findOne({ user: user._id });
    res.send(shippingAddress);
  })
);

export default shippingAddressRouter;
