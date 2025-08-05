import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
dotenv.config()
const Port=process.env.Port ||5000
const app=express()
app.use(cors(
    {
        origin:"http://localhost:5173",
        withCreadentials:true
    }
))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(Port,()=>
{
    connectDB()
    console.log(`server is runing ${Port}`)
})