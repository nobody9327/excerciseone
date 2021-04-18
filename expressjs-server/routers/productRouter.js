import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../constants/data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      const createdProducts = await Product.insertMany(data.products);
      res.send(createdProducts);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/delete",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log("params", req);
    const id = req.query.id;
    if (id) {
      const product = await Product.findById(id);
      if(product){
        product.active = false;
        product.save();
      }
      res.status(201);
      res.send({ message: "success" });
      return;
    }

    res.status(500).send("Invalid product ID");
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const id = req.body._id;
    console.log("req", req.body.name);
    let product = new Product();

    if (id) {
      product = await Product.findById(id);
      console.log("modify product");
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.numOfReviews = req.body.numOfReviews;
    product.image = req.body.image;
    product.description = req.body.description;
    product.countInStock = req.body.countInStock;

    const createdProduct = await product.save();

    res.send(createdProduct);
  })
);
export default productRouter;
