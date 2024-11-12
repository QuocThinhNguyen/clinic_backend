import express from "express";
import scheduleController from "../controllers/ScheduleController.js";
import { authUserMiddleware, authAdminMiddleware, authDoctorMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authDoctorMiddleware, scheduleController.getAllScheduleByDate); //Xử lí trả về tên bác sĩ, ngày làm việc và các ca trong ngày đó
router.get("/:id", authDoctorMiddleware, scheduleController.getScheduleByDate);
router.post("/", authDoctorMiddleware, scheduleController.createSchedule); //Xử lí tạo lịch làm việc cho bác sĩ
router.put("/:id", authDoctorMiddleware, scheduleController.updateSchedule);
router.delete("/:id", authDoctorMiddleware, scheduleController.deleteSchedule); //Xử lí cập nhật lịch làm việc cho bác sĩ
export default router;