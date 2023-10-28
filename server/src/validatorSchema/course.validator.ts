import { z } from "zod";

export const courseValidationSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price is required"),
    estimatedPrice: z.string().optional(),
    thumbnail: z.object({
      public_id: z.string().min(1, "Thumbnail public id is required"),
      url: z.string().min(1, "Thumbnail URL is required"),
    }),
    tags: z.string().min(1, "Tags are required"),
    level: z.string().min(1, "Level is required"),
    demoUrl: z.string().min(1, "Demo URL is required"),
    benefits: z
      .array(
        z.object({
          title: z.string().min(1, "Benefit title is required"),
        })
      )
      .min(1, "Benefits are required"),
    prerequistites: z
      .array(
        z.object({
          title: z.string().min(1, "Prerequisite title is required"),
        })
      )
      .min(1, "Prerequisites are required"),
    reviews: z.array(
      z.object({
        user: z.string().min(1, "User is required"),
        rating: z
          .number()
          .min(1)
          .max(5, "Rating must be between 1 and 5")
          .optional(),
        comment: z.string().optional(),
      })
    ),
    courseData: z.array(
      z.object({
        title: z.string().min(1, "Course title is required"),
        description: z.string().min(1, "Course description is required"),
        videoUrl: z.string().min(1, "Video Url is required"),
        videoThumbnail: z.object({
          url: z.string().min(1, "Video Thumbnail Url required"),
        }),
        videoSection: z.string().min(1, "Video section is required"),
        videoPlayer: z.string().min(1, "Video player is required"),
        links: z
          .array(
            z.object({
              title: z.string().min(1, "Video link title is required"),
              url: z.string().min(1, "Video link is required"),
            })
          )
          .min(1, "video links is required"),
        suggestion: z.string().min(1, "suggestion is required"),
        videoLength: z
          .number()
          .min(0, "Duration must be a non-negative number"),
      })
    ),
    rating: z
      .number()
      .min(1)
      .max(5, "Rating must be between 1 and 5")
      .optional(),
    purchased: z.number().optional(),
  })
  .refine((data) => data.reviews.length <= 0 || !!data.courseData.length, {
    message: "A course with reviews must have at least one course data entry.",
  })
  .describe("Course");
