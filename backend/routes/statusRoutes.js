import express from 'express'
import { getAllStatus, addStatus } from '../controllers/statusController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//Status Routes
//Since linked from server js treat each path as:
//api/status/

//Enables all status to be fetched for API
router.get("/", protect, getAllStatus);

//Enables user to create status
router.post('/', protect, addStatus);

export default router;
