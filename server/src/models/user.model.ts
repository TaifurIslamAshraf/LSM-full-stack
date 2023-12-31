import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../../@types/user.model";
import config from "../config/config";

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
    },

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    isSocialAuth: {
      type: Boolean,
      required: [true, "Please enter isSocialAuth"],
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
        couresId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
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

//access token generate
userSchema.methods.accessToken = function () {
  return jwt.sign({ _id: this._id }, config.accessTokenSecret || "", {
    expiresIn: "5m",
  });
};

//refresh token generate
userSchema.methods.refreshToken = function () {
  return jwt.sign({ _id: this._id }, config.refreshTokenSecret || "", {
    expiresIn: "3d",
  });
};

//compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
