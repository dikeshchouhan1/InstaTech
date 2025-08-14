import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();
const uploadOnCloudinary = async (file) => {




    try {

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        });

        const result = await cloudinary.uploader.upload(file, {
        
            resource_type: "auto"
        });
        fs.unlinkSync(file); // Remove the file after upload
        return result.secure_url;
    }
    catch (err) {
         fs.unlinkSync(file);
        console.error("Error uploading to Cloudinary:", err);
    }


}
export default uploadOnCloudinary;