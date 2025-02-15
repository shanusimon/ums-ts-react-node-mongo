import express from "express";
import {registerUser,loginUser, updateUser} from "../controllers/userControllers"
import { userOnly } from "../middleware/auth";

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser);
router.put('/updateProfile',userOnly,updateUser)


 export default router