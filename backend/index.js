import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
const Port=process.env.Port ||5000
const app=express()


app.get("/",(req,res)=>{
    res.send("hellow")
})

app.listen(Port,()=>
{
    connectDB()
    console.log(`server is runing ${Port}`)
})