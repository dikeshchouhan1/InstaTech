import express from "express"
import mongoose from "mongoose"

const loopSchema=new mongoose.Schema({
     auther:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
       
        media:{
            type:String,
            required:true
        },
        caption:{
            type:string
        },
        likes:[
            {
               type:mongoose.Schema.Types.ObjectId,
            ref:"User" 
            }
        ],
        comments:[
            {
               type:mongoose.Schema.Types.ObjectId,
            ref:"User" 
            }
        ]
    
},{
timeseries:ture
})

const Loop=mongoose.model("Loop",loopSchema)
export default Loop;