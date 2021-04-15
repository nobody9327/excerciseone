import express from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { createToken, isAuth } from "../utils.js";

const cartRouter = express.Router();

cartRouter.get(
  "/remove-item",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    console.log("params", req.params);
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: user._id });
    if (cart) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product != productId
      );
      const updatedCart = cart.save();

      const cartItems = updatedCart.items.map(async (item) => {
        const p = await Product.findById(item.product);
        return {
          name: p.name,
          price: p.price,
          image: p.image,
          description: p.description,
          rating: p.rating,
          numOfReviews: p.numOfReviews,
          quantity: p.quantity,
          brand: p.brand,
          category: p.category,
          countInStock: p.countInStock,
          _id: p._id,
        };
      });
      res.send(cartItems);
    } else {
      res.status(500).send({ message: "Cart is empty" });
    }
  })
);
cartRouter.get(
  "/empty",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const removedCart = await Cart.remove({ user: user._id });
    res.status(201).send();
  })
);
cartRouter.get(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log("params", req);
    const user = req.user;
    // console.log("user", user);
    const productId = req.query.id;
    const qty = req.query.quantity;

    const cart = await Cart.findOne({ user: user._id });
    let newCart = cart;
    if (newCart) {
      const exist = newCart.items.find((x) => x.product == productId);
      if (!exist) {
        newCart.items.push({ product: productId, quantity: qty });
      } else {
        newCart.items = newCart.items.map((item) =>
          item.product == productId
            ? { product: productId, quantity: qty }
            : item
        );

        // console.log("newCart", newCart);
      }
    } else {
      newCart = new Cart({ items: [{ product: productId, quantity: qty }], user: user._id });
    }

    const createdCart = await newCart.save();
    const cartItems = await Promise.all(
      createdCart.items.map(async (item) => {
        const p = await Product.findById(item.product);
        // console.log("p", p);
        return {
          name: p.name,
          price: p.price,
          image: p.image,
          description: p.description,
          rating: p.rating,
          numOfReviews: p.numOfReviews,
          quantity: p.quantity,
          brand: p.brand,
          category: p.category,
          countInStock: p.countInStock,
          _id: p._id,
          quantity: item.quantity,
        };
      })
    );

    // console.log("cartItems", cartItems);
    res.send(cartItems);
  })
);
cartRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const cart = await Cart.findOne({ user: user._id });
    if (cart) {
      const cartItems = await Promise.all(
        cart.items.map(async (item) => {
          const p = await Product.findById(item.product);
          return {
            name: p.name,
            price: p.price,
            image: p.image,
            description: p.description,
            rating: p.rating,
            numOfReviews: p.numOfReviews,
            quantity: p.quantity,
            brand: p.brand,
            category: p.category,
            countInStock: p.countInStock,
            _id: p._id,
            quantity: item.quantity,
          };
        })
      );
      // console.log("cartItems", cartItems);
      res.send(cartItems);
    } else {
      res.send([]);
    }
  })
);

export default cartRouter;
