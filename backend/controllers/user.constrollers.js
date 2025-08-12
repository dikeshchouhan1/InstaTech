import User from "../models/user.model.js"

export const getCurrentUser=async(req,res)=>{
    try{
          const userId=req.userId
          const user=await  User.findById(userId)
          if(! user){
            return res.status(400).json({message:'user not found'})
          }

         return res.status(200).json(user)
    }catch(err){
        return res.status(500).json({message:`get current user erro${err}`})
    }
}
export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId } // Exclude the current user
    }).select("-password");

    return res.status(200).json(users); // ✅ Send users to frontend
  } catch (err) {
    return res.status(500).json({ message: `get current user error: ${err.message}` });
  }
};
