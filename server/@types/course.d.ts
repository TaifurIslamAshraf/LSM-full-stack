import { Document } from "mongoose";

export interface IComment extends Document {
  user: object;
  qustion: string;
  qustionReplies: IComment[];
}

export interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies?: [Object];
}

export interface ILink extends Document {
  title: string;
  url: string;
}

export interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  qustions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: {
    title: string;
  }[];
  prerequistites: { title: string }[];
  reviews: IReview[];
  courseData: ICoursData[];
  rating?: number;
  purchased?: number;
}

export interface IQustionBody {
  qustion: string;
  courseId: string;
  contentId: string;
}

export interface IAddAsnwareBody {
  answare: string;
  courseId: string;
  contentId: string;
  qustionId: string;
}
