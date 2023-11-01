import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isSocialAuth: boolean;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  course: Array<{ couresId: object }>;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  accessToken: () => string;
  refreshToken: () => string;
}
