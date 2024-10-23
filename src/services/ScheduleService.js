import Schedule from "../models/schedule.js";

const getAllScheduleByDate = (date, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};

      console.log("service");
      console.log("date:", date);

      if (date) {
        filter.scheduleDate = {
          $gte: new Date(date + "T00:00:00Z"),
          $lt: new Date(date + "T23:59:59Z"),
        };
      }
      console.log("date:", date);
      console.log("filter", filter);

      // Truy vấn Schedule theo filter (có thể có hoặc không có scheduleDate)
      const allScheduleByDate = await Schedule.find(filter)
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
        // Sử dụng combination của doctorId và scheduleDate làm khóa
        const doctorId = schedule.doctorId._id.toString(); // Chuyển đổi ID thành chuỗi
        const scheduleDate = schedule.scheduleDate.toISOString(); // Chuyển đổi ngày thành chuỗi

        const key = `${doctorId}_${scheduleDate}`; // Tạo khóa duy nhất cho mỗi bác sĩ theo từng ngày

        if (!groupedSchedules[key]) {
          groupedSchedules[key] = {
            doctorId: schedule.doctorId,
            scheduleDate: schedule.scheduleDate,
            timeTypes: [],
          };
        }

        groupedSchedules[key].timeTypes.push(schedule.timeType);
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

const getScheduleByDate = (id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject(new Error("Missing required fields: id or date"));
      }

      const filter = {};
      filter.doctorId = id;
      if (date) {
        filter.scheduleDate = {
          $gte: new Date(date + "T00:00:00Z"),
          $lt: new Date(date + "T23:59:59Z"),
        };
      }

      //
      const allScheduleByDate = await Schedule.find(filter).populate({
        path: "doctorId",
        model: "Users",
        localField: "doctorId",
        foreignField: "userId",
        select: "fullname",
      });
      console.log("allScheduleByDate:", allScheduleByDate);

      if (allScheduleByDate.length === 0) {
        return resolve({
          status: "OK",
          message: "No schedule found",
          data: [],
        });
      }

      // Nhóm các timeType theo doctorId
      const groupedSchedules = {};

      allScheduleByDate.forEach((schedule) => {
        // Sử dụng combination của doctorId và scheduleDate làm khóa
        const doctorId = schedule.doctorId._id.toString(); // Chuyển đổi ID thành chuỗi
        const scheduleDate = schedule.scheduleDate.toISOString(); // Chuyển đổi ngày thành chuỗi

        const key = `${doctorId}_${scheduleDate}`; // Tạo khóa duy nhất cho mỗi bác sĩ theo từng ngày

        if (!groupedSchedules[key]) {
          groupedSchedules[key] = {
            doctorId: schedule.doctorId,
            scheduleDate: schedule.scheduleDate,
            timeTypes: [],
          };
        }

        groupedSchedules[key].timeTypes.push(schedule.timeType);
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
      });
    } catch (e) {
      console.error(e);
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

const updateSchedule = (id, timeTypes) => {};

const deleteSchedule = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject(new Error("Missing required field: id"));
      }
      console.log("service");

      console.log("id:", id);

      const deletedSchedule = await Schedule.deleteMany({
        doctorId: id,
      });
      console.log("doctorId:", id);

      console.log("deletedSchedule:", deletedSchedule);

      if (!deletedSchedule) {
        return reject(new Error("Schedule not found"));
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: deletedSchedule,
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

export default {
  getAllScheduleByDate,
  getScheduleByDate,
  createSchedule,
  deleteSchedule,
};
