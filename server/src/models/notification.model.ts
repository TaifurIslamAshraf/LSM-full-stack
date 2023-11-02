import { Model, Schema, model } from "mongoose";
import { INotification } from "../../@types/notification";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["seen", "unseen"],
      default: "unseen",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel: Model<INotification> = model(
  "Notification",
  notificationSchema
);
