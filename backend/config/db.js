import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB=async ()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("DB connected")
    }
    catch(err){
       console.log("DB error")
    }
}

export default connectDB;