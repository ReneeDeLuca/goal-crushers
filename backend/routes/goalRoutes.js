import express from "express";
import { getAllGoals,
    getGoal,
    createGoal, 
    updateGoal,
    likeGoal, 
    updateGoalData,
    deleteGoal
} from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

//Goal Routes
//Since linked from server js treat each path as:
//api/goal/:id, api/goal/, api/goal/likeGoal/:id, api/goal/deleteGoal/:id

//Enables all goals to be fetched for API
router.get("/", protect, getAllGoals);

//Enables user to view single goal by id
router.get("/:id", protect, getGoal);

//Enables user to create goal 
router.post('/', protect, createGoal);

//Enables user to edit goal 
router.put('/edit/:id', protect, updateGoal);

//Enables user to like goal. In controller, uses Goal model to update likes by 1
router.put("/likes/:id", protect, likeGoal);

//Enables user to update dates completed. In controller, uses Goal model to update dates completed
router.put("/:id", protect, updateGoalData)

//Enables user to delete goal. In controller, uses Goal model to delete post from MongoDB collection
router.delete("/:id", protect, deleteGoal);

export default router;
