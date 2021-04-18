import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../constants/data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, isAdmin, isAuth } from "../utils.js";
import request from "request-promise";

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

// userRouter.get(
//   "/test",
//   expressAsyncHandler(async (req, res) => {
//     request("https://oauth2.googleapis.com/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NDU3MzIxOGM2ZjZhMmZlNTBlMjlhY2JjNjg2NDMyODYzZmM5YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTUwNjg1MjE1MTEtNmhkbmY2dW8xamR1cmFxNTl1YTJmdHNucnJlcTVoc2YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTA2ODUyMTUxMS02aGRuZjZ1bzFqZHVyYXE1OXVhMmZ0c25ycmVxNWhzZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzkyNjUxNjgwNjQwMDE0OTU4NiIsImVtYWlsIjoibm9ib2R5LjkzLnZoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiT0tYamk0SGdTTl8xWTV5OTN5a3FJUSIsIm5hbWUiOiJIYXUgUGhhbiIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLU5MM1dFYnhQYllnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y25EZHhVSGdoSVNhVDVJcHBCMFpXN185QVJYbUEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkhhdSIsImZhbWlseV9uYW1lIjoiUGhhbiIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjE4Njc1NzExLCJleHAiOjE2MTg2NzkzMTEsImp0aSI6ImEyYTRkNzFlOTgxZDI2ZTM2MDdhN2JiMzFkMmEwOTU4ZjIzY2E5NjEifQ.A6ZSp-H-wMqGuLxe9fhRQEjfY_hNQ7T1qOH813ZLnMdNGxxl7gHfwTsgG6rz2pnJd0QA3916a3bLlVF6zQjUkIhWnR-kVxPgXxuYjXClT16C6aMUDLB34KKA_yBiZsMFtQEKa4uPFu97q90LNzDyuuUgNldopDrBg60YKpg-rFo4NejCLY6Z4RyFJEqsqTStc8CBwjwgi7fWgBkZcgGQXGxVvdOjaZu6MwWzy4Z3UcHQQikXqqIKg12-mOwt8Hs2ORkFzUlVphneaXei7sMXmCMbDScCfdB3SLGFCO0bWZDafXmvaF3lbT9E3Ozk-b6mthP89jxFS2-IDWGQbb1eJw", (err, response, body) => {
//       res.send(body);
//     });
//   })
// );

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
          phone: user.phone,
          token: createToken(user),
        });

        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.get(
  "/signin-with-facebook",
  expressAsyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    console.log("token", token);
    let url =
      "https://graph.facebook.com/v10.0/me?fields=id%2Clast_name%2Cemail%2Cname&access_token=";
    request(
      `${url}${token}`,
      expressAsyncHandler(async (err, response, body) => {
        if (err) {
          res.send(err.message);
        } else {
          try {
            const userInfo = JSON.parse(body);
            const { email, name } = userInfo;
            console.log("name", name, "email", email, "body", body);
            let user = await User.findOne({ email });
            if (!user) {
              user = new User({
                name,
                email,
                password: bcrypt.hashSync("thisispasswordxxndfdf4589xK!@#", 8),
                // phone: req.body.phone,
              });

              user = await user.save();
            }
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              isAdmin: user.isAdmin,
              phone: user.phone,
              token: createToken(user),
            });
          } catch (ex) {
            res.send(ex.message);
          }
        }
      })
    );
  })
);

userRouter.get(
  "/signin-with-google",
  expressAsyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    // console.log("token", token);
    let url = "https://oauth2.googleapis.com/tokeninfo?id_token=";
    request(
      `${url}${token}`,
      expressAsyncHandler(async (err, response, body) => {
        if (err) {
          res.send(err.message);
        } else {
          // console.log("body", body);
          try {
            const userInfo = JSON.parse(body);
            console.log("userInfo", userInfo);
            const { email, name } = userInfo;
            console.log("name", name, "email", email);
            let user = await User.findOne({ email });
            if (!user) {
              user = new User({
                name,
                email,
                password: bcrypt.hashSync("thisispasswordxxndfdf4589xK!@#", 8),
                // phone: req.body.phone,
              });

              user = await user.save();
            }
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              isAdmin: user.isAdmin,
              phone: user.phone,
              token: createToken(user),
            });
          } catch (ex) {
            res.send(ex.message);
          }
        }
      })
    );
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
      });

      const createdUser = await user.save();

      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        address: createdUser.address,
        isAdmin: createdUser.isAdmin,
        phone: createdUser.phone,
        token: createToken(createdUser),
      });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  })
);

userRouter.get(
  "/all",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const users = await User.find({});
    res.send(users);
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
    currentUser.phone = req.body.phone;
    currentUser.password = bcrypt.hashSync(req.body.password, 8);
    const updatedUser = await currentUser.save();
    res.send(updatedUser);
  })
);

export default userRouter;
