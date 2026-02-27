import express from 'express';
import {login, signUp, updateProfile} from "../controllers/userControllers.js";
import {checkAuth, isAuthenticated} from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.put("/update-profile",isAuthenticated,updateProfile);
userRouter.get("/check", isAuthenticated, checkAuth)

export default userRouter;