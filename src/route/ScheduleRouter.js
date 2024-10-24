import express from "express";
import scheduleController from "../controllers/ScheduleController.js";

const router = express.Router();

router.get("/", scheduleController.getAllScheduleByDate); //Xử lí trả về tên bác sĩ, ngày làm việc và các ca trong ngày đó
router.get("/:id", scheduleController.getScheduleByDate);
router.post("/", scheduleController.createSchedule); //Xử lí tạo lịch làm việc cho bác sĩ
router.put("/:id", scheduleController.updateSchedule);//chưa làm
router.delete("/:id", scheduleController.deleteSchedule); //Xử lí cập nhật lịch làm việc cho bác sĩ
export default router;
