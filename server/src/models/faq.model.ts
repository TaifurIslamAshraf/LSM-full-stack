import { Schema, model } from "mongoose";
import { IFaqItem } from "../../@types/layout";

const faqSchema = new Schema<IFaqItem>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const FaqModel = model<IFaqItem>("FAQ", faqSchema);

export default FaqModel;
