import Schedule from "../models/schedule.js";

const getAllScheduleByDate = (date, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("date:", date);

      const allScheduleByDate = await Schedule.find({
        scheduleDate: date,
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname",
        });
      console.log("allScheduleByDate:", allScheduleByDate);

      //
      // Nhóm các timeType theo doctorId
      const groupedSchedules = {};

      allScheduleByDate.forEach((schedule) => {
        const doctorId = schedule.doctorId._id.toString(); // Chuyển đổi ID thành chuỗi

        if (!groupedSchedules[doctorId]) {
          groupedSchedules[doctorId] = {
            doctorId: schedule.doctorId,
            scheduleDate: schedule.scheduleDate,
            timeTypes: [],
          };
        }

        groupedSchedules[doctorId].timeTypes.push(schedule.timeType);
      });

      // Chuyển đổi groupedSchedules thành mảng
      const result = Object.values(groupedSchedules).map((item) => ({
        doctorId: item.doctorId,
        scheduleDate: item.scheduleDate,
        timeTypes: item.timeTypes,
      }));

      //
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: result,
        currentPage: page,
        limit: limit,
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

const createSchedule = (doctorId, scheduleDate, timeTypes) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra nếu thiếu dữ liệu
      if (
        !doctorId ||
        !scheduleDate ||
        !Array.isArray(timeTypes) ||
        timeTypes.length === 0
      ) {
        return reject(
          new Error(
            "Missing required fields: doctorId, scheduleDate, or timeTypes"
          )
        );
      }
      console.log("service");

      console.log("doctorId:", doctorId);
      console.log("scheduleDate:", scheduleDate);
      console.log("timeTypes:", timeTypes);

      const createdSchedules = [];

      for (const timeType of timeTypes) {
        const newSchedule = new Schedule({
          doctorId,
          scheduleDate,
          timeType,
          maxNumber: process.env.MAX_NUMBER || 2,
          currentNumber: 0,
        });

        const savedSchedule = await newSchedule.save(); // Dùng save để tạo schedule
        createdSchedules.push(savedSchedule);
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: createdSchedules,
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

export default {
  getAllScheduleByDate,
  createSchedule,
};
