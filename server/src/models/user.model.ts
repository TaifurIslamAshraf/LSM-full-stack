import bcrypt from "bcryptjs";
import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../types/user.model";

const emailRegexValidtor: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: (value: string) => {
          return emailRegexValidtor.test(value);
        },
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    course: [
      {
        couresId: String,
      },
    ],
  },
  { timestamps: true }
);

//hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare password

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.Password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
