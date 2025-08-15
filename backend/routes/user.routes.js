import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfileUser, suggestedUsers } from "../controllers/user.constrollers.js";
import  upload  from "../public/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/suggested", isAuth, suggestedUsers);

// ✅ Pass username as URL parameter
userRouter.get("/getProfile/:userName", isAuth, getProfileUser);

userRouter.post("/editProfile", isAuth, upload.single("profileImage"), editProfile);

export default userRouter;