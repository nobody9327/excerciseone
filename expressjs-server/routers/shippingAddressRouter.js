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
      currentAddress.county = req.body.county;
      currentAddress.district = req.body.district;
      currentAddress.phone = req.body.phone;
      // console.log("currentAddress", currentAddress);
      const updatedAddress = await currentAddress.save();
      res.send(updatedAddress);
    } else {
      const updatedAddress = await ShippingAdress.create({
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        county: req.body.county,
        district: req.body.district,
        phone: req.body.phone,
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
