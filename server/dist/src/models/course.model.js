"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: String,
    commentReplies: {
        type: [Object],
    },
});
const linkSchem = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
const commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    qustion: {
        type: String,
    },
    qustionReplies: {
        type: [Object],
    },
});
const courseDataSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    videoSection: {
        type: String,
        required: true,
    },
    videoLength: {
        type: Number,
        required: true,
    },
    videoPlayer: {
        type: String,
        required: true,
    },
    links: {
        type: [linkSchem],
        required: true,
    },
    suggestion: {
        type: String,
        required: true,
    },
    qustions: {
        type: [commentSchema],
    },
});
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    estimatedPrice: {
        type: String,
    },
    thumbnail: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    tags: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    demoUrl: {
        type: String,
        required: true,
    },
    benefits: {
        type: [{ title: String }],
        required: true,
    },
    prerequistites: {
        type: [{ title: String }],
        required: true,
    },
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    rating: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const courseModel = (0, mongoose_1.model)("Course", courseSchema);
exports.default = courseModel;
