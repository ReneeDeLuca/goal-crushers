import express from "express";
import upload from "../middleware/multer.js";
import { getAllUsers,
    updateUserProfile,
    getUserLoginEdit,
    updateUserLogin,
    getUser,
    deleteUser
} from '../controllers/userController.js';
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

//User Routes
//Since linked from server js treat each path as:
//user/:id, user/updateUserProfile, etc

//Enables fetch for API
router.get("/", protect, getAllUsers);

//Enables user to view user Dashboard
router.get("/:id", protect, getUser);

//Enables user to edit user profile w/ cloudinary for media uploads
router.put("profile/:id", protect, upload.single("file"), updateUserProfile);

//Enables user to view edit user login page
router.get("/loginEdit/:id", protect, getUserLoginEdit);

//Enables user to edit user login
router.put("/login/:id", protect, updateUserLogin);

//Enables user to delete user data. In controller, uses POST model to delete profile from MongoDB collection
router.delete("/:id", protect, deleteUser);

export default router;
