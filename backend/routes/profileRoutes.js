import express from "express";
import { 
    getProfile, 
    followProfile,
    unfollowProfile
} from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//Profile Routes
//Since linked from server js treat each path as:
//profile/:id, profile/follow/:id, etc

//Enables user to view user profile
router.get("/:id", protect, getProfile);

//Enables user to follow a profile
router.put("/follow/:id", protect, followProfile);

//Enables user to unfollow a profile
router.put("/unfollow/:id", protect, unfollowProfile);


export default router;