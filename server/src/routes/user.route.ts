import express from "express";
import {
  activateUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  socialAuth,
  updateAccessToken,
  updateAvatar,
  updatePassword,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizedUser, isAuthenticated } from "../helpers/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/activation", activateUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh", updateAccessToken);
router.get("/me", isAuthenticated, getUserInfo);
router.get("/users", isAuthenticated, authorizedUser("admin"), getAllUsers);
router.post("/social-auth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-user-avatar", isAuthenticated, updateAvatar);
router.patch(
  "/update-user-role",
  isAuthenticated,
  authorizedUser("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizedUser("admin"),
  deleteUser
);

export default router;
