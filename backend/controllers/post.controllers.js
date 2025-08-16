
import Post from "../models/post.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const uploadPost= async (req, res) => {
     try{
          const {caption, mediaType}= req.body;
          let media;
          if(req.file){
                media = await uploadOnCloudinary(req.file.path);
          }
          else{
            return res.status(400).json({ message: "No media file provided" });
          }

          const post = await Post.create({
               auther: req.userId,
               caption,
               media,
               mediaType
          });
          const user= await User.findById(req.userId)
          user.posts.push(post._id);
            await user.save();

          const populatedPost = await Post.findById(post._id).populate("auther", "name userName profileImage")
          return res.status(201).json(populatedPost);
     }
     catch(err){
            return res.status(500).json({ message: `Upload post error: ${err.message}` });
     }
}



export const getAllPosts = async (req, res) => {
    try{
       const posts=await Post.find({auther: req.userId}).populate("auther", "name userName profileImage")
       return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json({ message: `Get all posts error: ${err.message}` });
    }
}



export const  like= async (req, res) => {
    try{
     const postId = req.params.postId;
     const post = await Post.findById(postId);
     if (!post) {
       return res.status(404).json({ message: "Post not found" });
     }

     const alreadyLiked = post.likes.some(id=>id.toString() === req.userId.toString());
     if(alreadyLiked){
        post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
     }
     else{
        post.likes.push(req.userId);
     }
     await post.save();
     post.populate("auther", "name userName profileImage");

     return res.status(200).json(post);
    }
    catch(err){
      return res.status(500).json({ message: `Like post error: ${err.message}` });
    }
}


export const comments=async (req, res) => {

    try{
      const postId = req.params.postId;
        const { message } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
        post.comments.push({
          auther: req.userId,
          message})
          await post.save();
          post.populate("auther", "name userName profileImage");
          post.populate("comments.auther");
          return res.status(200).json(post);
    }catch(err){
        return res.status(500).json({ message: `Comments error: ${err.message}` });
    }
}



export const saved=async (req, res) => {
     try{
     const postId = req.params.postId;
     
     const user = await User.findById(req.userId);
     

     const alreadySaved = user.saved.some(id=>id.toString() === postId.toString());
     if(alreadySaved){
        user.saved = user.saved.filter(id => id.toString() !== postId.toString());
     }
     else{
        user.saved.push(postId);
     }
     await user.save();
     user.populate( "saved");

     return res.status(200).json(user);
    }
    catch(err){
      return res.status(500).json({ message: `saved post error: ${err.message}` });
    }
    
}