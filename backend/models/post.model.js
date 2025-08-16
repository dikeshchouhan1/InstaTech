import mongoose, { Mongoose } from "mongoose";

const postSchema = new mongoose.Schema({
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true
    },
    media: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            auther: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            message: {
                type: String,
                required: true
            }
        }
    ]

}, { timeseries: true })

const Post = mongoose.model("Post", postSchema)
export default Post