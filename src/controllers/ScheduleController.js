import scheduleService from "../services/ScheduleService.js";

const getAllScheduleByDate = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("req.query.date:", req.query.date);

    const date = {
      $gte: new Date(req.query.date + "T00:00:00Z"),
      $lt: new Date(req.query.date + "T23:59:59Z"),
    };
    console.log("date:", date);

    const response = await scheduleService.getAllScheduleByDate(
      date,
      page,
      limit
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const createSchedule = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const scheduleDate = req.body.scheduleDate;
    const timeTypes = req.body.timeTypes;

    console.log("doctorId:", doctorId);
    console.log("scheduleDate:", scheduleDate);
    console.log("timeTypes:", timeTypes);

    const response = await scheduleService.createSchedule(
      doctorId,
      scheduleDate,
      timeTypes
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

export default {
  getAllScheduleByDate,
  createSchedule,
};
