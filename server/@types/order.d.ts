import { Document } from "mongoose";

export interface IOrder extends Document {
  courseId: object;
  userId: object;
  payment_info: object;
}
