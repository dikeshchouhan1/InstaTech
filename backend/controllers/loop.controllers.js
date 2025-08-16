import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";
import  uploadOnCloudinary  from "../config/cloudinary.js";  // make sure this exists

// Upload loop
export const uploadLoop = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    let media;

    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "No media file provided" });
    }

    const loop = await Loop.create({
      author: req.userId,   // <-- change to author (if schema uses auther, keep it as auther)
      caption,
      media,
      mediaType
    });

    const user = await User.findById(req.userId);
    user.loops.push(loop._id);
    await user.save();

    const populatedLoop = await Loop.findById(loop._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedLoop);
  } catch (err) {
    return res.status(500).json({ message: `UploadLoop error: ${err.message}` });
  }
};

// Like loop
export const like = async (req, res) => {
  try {
    const loopId = req.params.loopId;
    const loop = await Loop.findById(loopId);

    if (!loop) {
      return res.status(404).json({ message: "Loop not found" });
    }

    const alreadyLiked = loop.likes.some(
      (id) => id.toString() === req.userId.toString()
    );

    if (alreadyLiked) {
      loop.likes = loop.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      loop.likes.push(req.userId);
    }

    await loop.save();
    await loop.populate("author", "name userName profileImage");

    return res.status(200).json(loop);
  } catch (err) {
    return res.status(500).json({ message: `Like loop error: ${err.message}` });
  }
};

// Comment on loop
export const comments = async (req, res) => {
  try {
    const loopId = req.params.loopId;   // fixed (was postId)
    const { message } = req.body;

    const loop = await Loop.findById(loopId);
    if (!loop) {
      return res.status(404).json({ message: "Loop not found" });
    }

    loop.comments.push({
      author: req.userId,   // <-- same: change to auther if schema uses that spelling
      message,
    });

    await loop.save();

    await loop.populate("author", "name userName profileImage");
    await loop.populate("comments.author");

    return res.status(200).json(loop);
  } catch (err) {
    return res.status(500).json({ message: `Comments loop error: ${err.message}` });
  }
};




export const getAllLoops = async (req, res) => {
    try{
       const loops=await Post.find({}).populate("auther", "name userName profileImage")
       .populate("comments.auther")
       return res.status(200).json(loops);
    }catch(err){
        return res.status(500).json({ message: `Get all loops error: ${err.message}` });
    }
}
