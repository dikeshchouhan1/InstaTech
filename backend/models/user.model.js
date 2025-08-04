import mongoose, { Types } from "mongoose";

const userSchema=new mongoose.Schema({
   name:{
    type:String,

    required:true

   },
   userName:{
      type:String,
      required:true,
      unique:true
   }
   ,
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,

    required:true

   },
   profileImage:{
    type:String
   },

   following:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
   ],
   posts:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
   ],
   saved:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
   ]
   ,
   lopps:[{
    type:mongoose.Schema.Types.ObjectId,
        ref:"Loop"
    }
   ]
   ,
   story:{
    type:mongoose.Schema.Types.ObjectId,
        ref:"Story"

   }


},{timeseries:true})

const User=mongoose.model("User",userSchema)
export default User;