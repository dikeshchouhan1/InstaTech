import express from "express"
import { signOut, singIn, singUp } from "../controllers/auth.controllers.js"

const authRouter=express.Router()

authRouter.post("/signup",singUp)
authRouter.post("/signin",singIn)
authRouter.get("/signout",signOut)

export default authRouter