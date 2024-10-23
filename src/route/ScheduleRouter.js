import express from "express";
import scheduleController from "../controllers/ScheduleController.js";

const router = express.Router();

router.get("/", scheduleController.getAllScheduleByDate); //Xử lí trả về tên bác sĩ, ngày làm việc và các ca trong ngày đó
router.post("/",scheduleController.createSchedule); //Xử lí tạo lịch làm việc cho bác sĩ



export default router;
