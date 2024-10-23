import express from "express";
import scheduleController from "../controllers/ScheduleController.js";

const router = express.Router();

router.get("/", scheduleController.getAllScheduleByDate); //Xử lí trả về tên bác sĩ, ngày làm việc và các ca trong ngày đó

export default router;
