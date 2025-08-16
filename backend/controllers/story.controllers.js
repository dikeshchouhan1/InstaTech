import User from "../models/user.model.js";
import Story from "../models/story.model.js";
import  uploadOnCloudinary from "../config/cloudinary.js";  // make sure this exists 
import { populate } from "dotenv";


export const uploadStory=async (req, res) => {
    try{
        const user= await User.findById(req.userId);
        if(user.story){
            await Story.findByIdAndDelete(user.story);
            user.story = null; // Clear the story reference
        }

        const {mediaType} = req.body;
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }
        else{
            return res.status(400).json({ message: "No media file provided" });
        }

        const story = await Story.create({
            auther: req.userId,
            mediaType,
            media
        });
        user.story = story._id; // Set the user's story reference
        await user.save();

        const populatedStory = await Story.findById(story._id).populate("auther", "name userName profileImage")
        .populate("viewers", "name userName profileImage");

        return res.status(200).json(populatedStory)
    }
    catch(err){
        return res.status(500).json({ message: `Upload story error: ${err.message}` });
    }
}


export const viewStory=async (req,res)=>{
    try{
        const storyId=req.params.storyId
        const story =await Story.findById(storyId)

        if(!story){
            return  res.status(400).json({message:"story not found"})
        }
        const viewersIds=story.viewers.map(id=>id.toString())
        if(!viewersIds.includes(req.userId.toString())){
            story.viewers.push(req.userId)
            await story.save()

            const populatedStory=await Story.findById(story._id).
            populate("auther","name userName profileImage")
            .populate("viewers","name userName profileImage")
            return res.status(200).json(populate)
        }
    }
    catch(err){
 return res.status(500).json({ message: `Upload story error: ${err.message}` });
    }
}


export const getStoryByUserName=async(req,res)=>{
    try{
      const userName=req.params.userName
      const user=await User.findOne({userName})

      if(!user){
        return res.status(400).json({message:"user not found"})
      }

      const story=await Story.find({
        auther:user._id
      }).populate("viewers auther")

      return res.status(200).json(story)
    }
    catch(err){
        return res.status(500).json({message:"story get by userName error"})
    }
} 