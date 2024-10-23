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
export default {
  getAllScheduleByDate,
};
