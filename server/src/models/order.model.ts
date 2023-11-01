import { Model, Schema, model } from "mongoose";
import { IOrder } from "../../@types/order";

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_info: {
      type: Object,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel: Model<IOrder> = model("Order", orderSchema);
