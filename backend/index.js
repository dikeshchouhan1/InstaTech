import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import loopRouter from "./routes/loop.routes.js"
import storyRouter from "./routes/story.routes.js"

dotenv.config()
const Port=process.env.Port ||5000
const app=express()
app.use(cors(
    {
        origin:"http://localhost:5173",
          credentials: true // ✅ correct spelling

    }
))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/loop",loopRouter)
app.use("/api/story",storyRouter)

app.listen(Port,()=>
{
    connectDB()
    console.log(`server is runing ${Port}`)
})