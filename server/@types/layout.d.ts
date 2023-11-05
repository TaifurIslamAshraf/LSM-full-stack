import { Document } from "mongoose";

export interface IFaqItem {
  qustion: string;
  answare: string;
}

export interface ICategory {
  title: string;
}

export interface IBannerImg {
  public_id: string;
  url: string;
}

export interface Layout extends Document {
  type: string;
  faq: IFaqItem[];
  category: ICategory[];
  banner: {
    image: IBannerImg;
    title: string;
    subtitle: string;
  };
}
