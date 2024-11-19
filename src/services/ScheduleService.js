import Schedule from "../models/schedule.js";

const getAllScheduleByDate = (date, page, limit, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};
      if (date) {
        filter.scheduleDate = {
          $gte: new Date(date + "T00:00:00Z"),
          $lt: new Date(date + "T23:59:59Z"),
        };
      }
      // Truy vấn Schedule theo filter (có thể có hoặc không có scheduleDate)
      const allScheduleByDate = await Schedule.find(filter)
        // .skip((page - 1) * limit)
        // .limit(limit)
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname",
        });

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
      // Bộ lọc
      const regex = new RegExp(query.query, 'i');

      // Chuyển đổi groupedSchedules thành mảng
      const result = Object.values(groupedSchedules).map((item) => ({
        doctorId: item.doctorId,
        scheduleDate: item.scheduleDate.toISOString().split('T')[0],
        timeTypes: item.timeTypes,
      }))//.slice((page - 1) * limit, page * limit);
      //Tính tổng số lượng kết quả phù hợp (không phân trang)
      const totalFilteredResults = result.filter((doctor) => {
        return (
          regex.test(doctor.doctorId?.fullname)
        );
      }).length;
      //Áp dụng skip và limit cho danh sách đã filter
      const filteredResults = result.filter((doctor) => {
        return (
          regex.test(doctor.doctorId?.fullname)
        );
      });
      const sortedResults = filteredResults.sort((a, b) => {
        const dateA = new Date(a.scheduleDate);
        const dateB = new Date(b.scheduleDate);
        return dateA - dateB;
      }).slice((page - 1) * limit, page * limit);
      const totalPages = Math.ceil(totalFilteredResults / limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: sortedResults,
        totalPages,
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

      const allScheduleByDate = await Schedule.find(filter).populate({
        path: "doctorId",
        model: "Users",
        localField: "doctorId",
        foreignField: "userId",
        select: "fullname",
      });

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
            currentNumbers: []
          };
        }
        groupedSchedules[key].timeTypes.push(schedule.timeType);
        groupedSchedules[key].currentNumbers.push(schedule.currentNumber);

      });

      // Chuyển đổi groupedSchedules thành mảng
      const result = Object.values(groupedSchedules).map((item) => ({
        doctorId: item.doctorId,
        scheduleDate: item.scheduleDate.toISOString().split('T')[0],
        timeTypes: item.timeTypes,
        currentNumbers: item.currentNumbers,
      }));

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
      const checkSchedule = await Schedule.find({
        doctorId,
        scheduleDate,
        timeType: { $in: timeTypes },
      });
      if (checkSchedule.length > 0) {
        return reject(new Error("Schedule already exists"));
      }

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
      console.error(e);
      reject(e.message);
    }
  });
};

const updateSchedule = (doctorId, scheduleDate, timeTypes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedSchedules = [];

      await Schedule.deleteMany({
        doctorId,
        scheduleDate,
      });

      for (const timeType of timeTypes) {
        const updatedSchedule = new Schedule({
          doctorId,
          scheduleDate,
          currentNumber: 0,
          maxNumber: process.env.MAX_NUMBER || 2,
          timeType,
        });
        const savedSchedule = await updatedSchedule.save();
        updatedSchedules.push(savedSchedule);
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedSchedules,
      });
    } catch (error) {
      console.error(error);
      reject(error.message);
    }
  });
};

const deleteSchedule = (id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};
      filter.doctorId = id;
      filter.scheduleDate = {
        $gte: new Date(date + "T00:00:00Z"),
        $lt: new Date(date + "T23:59:59Z"),
      };
      const deletedSchedule = await Schedule.deleteMany(filter);
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
  updateSchedule,
  deleteSchedule,
};
