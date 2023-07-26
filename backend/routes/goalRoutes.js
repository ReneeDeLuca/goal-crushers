import express from "express";
import { getGoal,
    newGoal, 
    createGoal, 
    editGoal,
    updateGoal,
    likeGoal, 
    updateGoalData,
    deleteGoal
} from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

//Goal Routes
//Since linked from server js treat each path as:
//goal/:id, goal/createGoal, goal/likeGoal/:id, goal/deleteGoal/:id

//Enables user to view single goal by id
router.get("/:id", protect, getGoal);

//Enables user to view add goal page
router.get('/add', protect, newGoal);

//Enables user to create goal 
router.post('/', protect, createGoal);

//Enables user to view edit goal page
router.get('/edit/:id', protect, editGoal);

//Enables user to edit goal 
router.put('/edit/:id', protect, updateGoal);

//Enables user to like goal. In controller, uses Goal model to update likes by 1
router.put("/likes/:id", protect, likeGoal);

//Enables user to update completion data. In controller, uses Goal model to update completion data
router.put("progress/:id", protect, updateGoalData)

//Enables user to delete goal. In controller, uses Goal model to delete post from MongoDB collection
router.delete("/:id", protect, deleteGoal);

export default router;
