import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../public/multer.js";
import { comments, getAllLoops, like, uploadLoop } from "../controllers/loop.controllers.js";


const loopRouter = express.Router();

loopRouter.post("/upload", isAuth, upload.single("media") ,uploadLoop);
loopRouter.get("/getAll", isAuth, getAllLoops)


loopRouter.get("/like/:postId", isAuth,like);


loopRouter.post("/comment", isAuth, comments);

export default loopRouter;