import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  course: Array<{ couresId: string }>;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  accessToken: () => string;
  refreshToken: () => string;
}
