import express from "express";
import { getAllUsers,
    updateUserImage,
    updateUserAboutMe,
    updateUserLogin,
    getUser,
    followUser,
    unfollowUser,
    deleteUserImage,
    deleteUser,
} from '../controllers/userController.js';
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

//User Routes
//Since linked from server js treat each path as:
//user/:id, user/profile/:id, etc

//Enables fetch for API
router.get("/", protect, getAllUsers);

//Enables user to view user Dashboard
router.get("/:id", protect, getUser);

//Enables user to delete user image from cloudinary
router.post("/tempimage/:public_id", protect, deleteUserImage);

//Enables user to edit user profile image w/ cloudinary info
router.put("/image/:id", protect, updateUserImage);

//Enables user to edit user about me
router.put("/aboutme/:id", protect, updateUserAboutMe);

//Enables user to edit user login
router.put("/login/:id", protect, updateUserLogin);

//Enables user to follow another user
router.put("/follow/:id", protect, followUser);

//Enables user to unfollow another user
router.put("/unfollow/:id", protect, unfollowUser);

//Enables user to delete user data. In controller, uses POST model to delete profile from MongoDB collection
router.delete("/:id", protect, deleteUser);

export default router;
