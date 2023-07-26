import express from "express";
import { getIndex,
    getUserLogin,
    getUserRegister,
 } from '../controllers/mainController.js';
import { authUser,    
    registerUser,
    logoutUser
} from '../controllers/authController.js';


const router = express.Router();

//Main Routes 
router.get("/", getIndex);
router.get("/login", getUserLogin);
router.get("/register", getUserRegister);

//Auth Routes
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);



export default router;
