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
  authMiddleware,
  authUserMiddleware,
} from "../middlewares/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

router.post("/sign-up", createAndSendOTPController);
router.post("/verify-account/:token", verifyUserController);
router.post("/sign-in", loginUserController);
router.post("/logout", logoutUserController);
router.post("/reset-password", resetUserPasswordController);
router.get("/reset-password/:token", handleResetPasswordTokenController);
router.post("/refresh_token", refreshToken);

//CRUD user


router.get("/", authAdminMiddleware, getUserByNameOrEmailController); //Tìm kiếm user theo tên, email
router.get("/", authAdminMiddleware, getAllUserController); //Lấy tất cả user
router.get("/:id", authMiddleware, getDetailsUserController); //Lấy thông tin một user
router.post("/", authMiddleware, upload.single("image"), createUserController); //Thêm user
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateUserController
); //Cập nhật user
router.delete("/:id", authMiddleware, deleteUserController); //Xóa user

export default router;
