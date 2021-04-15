import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      expressAsyncHandler(async (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid token" });
        } else {
          // console.log("decode", decode);
          req.user = decode;
          next();
        }
      })
    );
  } else {
    res.status(401).send({ message: "No token" });
  }
};

export const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    next();
  } else {
    res.send(401).send({ message: "Invalid Admin token" });
  }
};
