import { IUser } from "./user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
