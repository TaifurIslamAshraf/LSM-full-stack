import { Model, Schema, model } from "mongoose";
import {
  IComment,
  ICourse,
  ICourseData,
  ILink,
  IReview,
} from "../../@types/course";

const reviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
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

const linkSchem = new Schema<ILink>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const commentSchema = new Schema<IComment>({
  user: {
    type: Schema.Types.ObjectId,
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

const courseDataSchema = new Schema<ICourseData>({
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

const courseSchema = new Schema<ICourse>(
  {
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
  },
  {
    timestamps: true,
  }
);

const courseModel: Model<ICourse> = model("Course", courseSchema);
export default courseModel;
