import express from "express";
import {
  createUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getDetailsUserController,
  refreshToken,
  logoutUserController,
  resetUserPasswordController,
  handleResetPasswordTokenController,
  verifyUserController,
  createAndSendOTPController,
  getUserByNameOrEmailController,
} from "../controllers/UserController.js";
import {
  authAdminMiddleware,
  authMiddleware,
  authUserMiddleware,
} from "../middlewares/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

//CRUD user
router.get("/search", authAdminMiddleware, getUserByNameOrEmailController); //Tìm kiếm user theo tên, email
router.get("/", authAdminMiddleware, getAllUserController); //Lấy tất cả user
router.get("/:id", authMiddleware, getDetailsUserController); //Lấy thông tin một user
router.post("/", authAdminMiddleware, upload.single("image"), createUserController); //Thêm user
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateUserController
); //Cập nhật user
router.delete("/:id", authAdminMiddleware, deleteUserController); //Xóa user

export default router;