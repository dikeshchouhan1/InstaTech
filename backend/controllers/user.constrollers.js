import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'user not found' })
    }

    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ message: `get current user erro${err}` })
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

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;

    // Find the logged-in user
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if username already exists for another user
    const sameUserWithUserName = await User.findOne({ userName }).select("-password");
    if (sameUserWithUserName && sameUserWithUserName._id.toString() !== req.userId.toString()) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Upload new profile image if file is provided
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      user.profileImage = uploadedImage?.url || user.profileImage;
    }

    // Update fields
    user.name = name ?? user.name;
    user.userName = userName ?? user.userName;
    user.bio = bio ?? user.bio;
    user.profession = profession ?? user.profession;
    user.gender = gender ?? user.gender;

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    return res.status(500).json({ message: `edit profile error: ${err.message}` });
  }
};


export const getProfileUser = async (req, res) => {
  try {
    const userName = req.params.userName; // lowercase to match the route

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `get profile user error: ${err.message}` });
  }
};


