import Image from "../models/Image.js";
import asyncHandler from "express-async-handler";
import express from "express";
import cloudinary from "../middleware/cloudinary.js";

const router = express.Router(); //api/images

//@desc  get all imagess to load to api
//@route GET api/images/
// link to imagesApiSlice -> getAllImages
const getAllImages = asyncHandler(async (req, res) => {
  try {
    const images = await Image.find({}).lean();
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//@desc get image by id
//@route GET api/images/:id
// ling to imagesApiSlice -> getImageById

const getImageById = asyncHandler(async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId.slice(1)).lean();
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image);
  } catch (err) {
    console.error(err);
  }
});

// @desc  add image
// @route POST api/images/
// link to Cloudinary Upload Widget
const addImage = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const publicId = req.publicId;
  const secureUrl = req.secureUrl;
  const strResult = req.str_result;
  try {
    const data = await Image.create({ userId, publicId, secureUrl, strResult });
    res.json({ message: "Image added", data });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  delete image
// @route DELETE api/images/:id
// link to imagesApiSlice -> deleteImage

const deleteImage = asyncHandler(async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId.slice(1));
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    await image.remove();
    res.json({ message: "Image removed" });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

export { getAllImages, addImage, getImageById, deleteImage };
