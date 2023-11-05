import { Schema, model } from "mongoose";
import { IBannerImg, ICategory, IFaqItem, Layout } from "../../@types/layout";

const faqSchema = new Schema<IFaqItem>({
  qustion: {
    type: String,
  },
  answare: {
    type: String,
  },
});

const categorySchema = new Schema<ICategory>({
  title: { type: String },
});

const bannerImageSchema = new Schema<IBannerImg>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  category: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subtitle: { type: String },
  },
});

const LayoutModel = model<Layout>("Layout", layoutSchema);
export default LayoutModel;
