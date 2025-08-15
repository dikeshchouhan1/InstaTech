import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uploadOnCloudinary = async (filePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

    fs.unlinkSync(filePath); // delete local file
    return result.secure_url; // return the Cloudinary URL
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // ensure cleanup
    console.error("Error uploading to Cloudinary:", err);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default uploadOnCloudinary;
