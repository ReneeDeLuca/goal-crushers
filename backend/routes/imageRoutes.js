import express from "express";
import { getAllImages, getImageById, addImage, deleteImage } from "../controllers/imageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

//Image Routes
//Since linked from server js treat each path as:
//api/images/

//Enables all images to be fetched for API
router.get("/", protect, getAllImages);

//Enables user to get image by id
router.get("/:id", protect, getImageById);

//Enables user to create image
router.post('/', protect, addImage);

//Enables user to delete image
router.delete('/:id', protect, deleteImage);

export default router;
