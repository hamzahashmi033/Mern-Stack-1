import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"],
        minLength: [4, "Title must be 4 characters long"],
        maxLength: [80, "Title can't exceed 80 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description"],
        minLength: [20, "Description must be 20 characters"]
    },
    lectures: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            video: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    views: {
        type: Number,
        default: 0
    },
    numOfVideos: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: [true, "Enter the Course Creator Name"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Course = mongoose.model("Course", schema)