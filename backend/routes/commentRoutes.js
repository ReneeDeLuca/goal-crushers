import express from "express";
import { getAllComments,
    getComment,
    addComment,
    addLike,
    deleteComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//Comment Routes
//Since linked from server js treat each path as: api/comment/:id, api/comment/, etc

//Enables all comments to be fetched for API
router.get("/", protect, getAllComments);

//Enables user to get comment by id
router.get("/:id", protect, getComment);

//Enables user to create comment
router.post('/', protect, addComment);

//Enables user to like comment
router.put("/:id", protect, addLike);

//Enables user to delete comment
router.delete("/:id", protect, deleteComment);

export default router;