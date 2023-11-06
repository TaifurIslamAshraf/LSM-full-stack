import { Schema, model } from "mongoose";
import { ICategory } from "../../@types/layout";

const categorySchema = new Schema<ICategory>({
  title: { type: String },
});

const CategoryModel = model<ICategory>("Category", categorySchema);
export default CategoryModel;
