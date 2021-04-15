import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../constants/data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      await User.remove({});
      const createdUsers = await User.insertMany(data.users);
      res.send(createdUsers);
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // console.log("secret", process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          isAdmin: user.isAdmin,
          token: createToken(user),
        });

        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const createdUser = await user.save();

      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        address: createdUser.address,
        isAdmin: createdUser.isAdmin,
        token: createToken(createdUser),
      });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  })
);

userRouter.post(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const currentUser = await User.findById(user._id);
    currentUser.name = req.body.name;
    currentUser.email = req.body.email;
    currentUser.password = bcrypt.hashSync(req.body.password, 8);
    const updatedUser = await currentUser.save();
    res.send(updatedUser);
  })
);

export default userRouter;
