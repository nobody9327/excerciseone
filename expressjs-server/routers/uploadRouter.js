import multer from "multer";
import path from "path";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const images = req.images || [];
    console.log('name', file.originalname)
    const newFileName = Date.now() + "_" +file.originalname.replaceAll(/\s+/g, "-");
    cb(null, `${newFileName}`);
    images.push({name: file.originalname, url: `/resource/uploads/${newFileName}`});
    req.images = images;
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  res.send(`/resource/${req.file.path}`);
});

uploadRouter.post("/images", upload.array("images", 10), (req, res) => {
  const images = req.images;
  console.log(images);
  res.send(images);
});

export default uploadRouter;
