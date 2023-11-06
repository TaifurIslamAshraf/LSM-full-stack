import { Schema, model } from "mongoose";
import { IBannerImg } from "../../@types/layout";

const bannerSchema = new Schema<IBannerImg>({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

const BannerModel = model<IBannerImg>("Layout", bannerSchema);
export default BannerModel;
