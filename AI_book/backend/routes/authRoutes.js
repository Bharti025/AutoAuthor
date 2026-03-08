import express from "express";
import { loginUser,registerUser,getProfile,updateProfile } from "../controller/authController.js";
import {protect} from "../middleware/authMiddleware.js"
const AuthRouter = express.Router()

AuthRouter.post('/register',registerUser);
AuthRouter.post('/login',loginUser);
AuthRouter.get('/profile',protect,getProfile)
AuthRouter.put('/profile',protect,updateProfile);
export default AuthRouter
