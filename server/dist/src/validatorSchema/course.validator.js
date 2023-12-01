"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidationSchema = void 0;
const zod_1 = require("zod");
exports.courseValidationSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().min(0, "Price is required"),
    estimatedPrice: zod_1.z.string().optional(),
    thumbnail: zod_1.z.object({
        public_id: zod_1.z.string().min(1, "Thumbnail public id is required"),
        url: zod_1.z.string().min(1, "Thumbnail URL is required"),
    }),
    tags: zod_1.z.string().min(1, "Tags are required"),
    level: zod_1.z.string().min(1, "Level is required"),
    demoUrl: zod_1.z.string().min(1, "Demo URL is required"),
    benefits: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string().min(1, "Benefit title is required"),
    }))
        .min(1, "Benefits are required"),
    prerequistites: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string().min(1, "Prerequisite title is required"),
    }))
        .min(1, "Prerequisites are required"),
    reviews: zod_1.z.array(zod_1.z.object({
        user: zod_1.z.string().min(1, "User is required"),
        rating: zod_1.z
            .number()
            .min(1)
            .max(5, "Rating must be between 1 and 5")
            .optional(),
        comment: zod_1.z.string().optional(),
    })),
    courseData: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1, "Course title is required"),
        description: zod_1.z.string().min(1, "Course description is required"),
        videoUrl: zod_1.z.string().min(1, "Video Url is required"),
        videoThumbnail: zod_1.z.object({
            url: zod_1.z.string().min(1, "Video Thumbnail Url required"),
        }),
        videoSection: zod_1.z.string().min(1, "Video section is required"),
        videoPlayer: zod_1.z.string().min(1, "Video player is required"),
        links: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string().min(1, "Video link title is required"),
            url: zod_1.z.string().min(1, "Video link is required"),
        }))
            .min(1, "video links is required"),
        suggestion: zod_1.z.string().min(1, "suggestion is required"),
        videoLength: zod_1.z
            .number()
            .min(0, "Duration must be a non-negative number"),
    })),
    rating: zod_1.z
        .number()
        .min(1)
        .max(5, "Rating must be between 1 and 5")
        .optional(),
    purchased: zod_1.z.number().optional(),
})
    .refine((data) => data.reviews.length <= 0 || !!data.courseData.length, {
    message: "A course with reviews must have at least one course data entry.",
})
    .describe("Course");
