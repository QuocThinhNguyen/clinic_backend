import scheduleService from "../services/ScheduleService.js";

const getAllScheduleByDate = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("req.query.date:", req.query.date);

    const date = req.query.date;
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

const getScheduleByDate = async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.query.date;

    console.log("controller");
    console.log("id:", id);
    console.log("date:", date);

    const response = await scheduleService.getScheduleByDate(id, date);
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

const updateSchedule = async (req, res) => {
  // try{
  //   const doctorId = req.params.id;
  //   const scheduleDate = req.body.scheduleDate;
  //   const timeTypes = req.body.timeTypes;
  //   const response = await scheduleService.updateSchedule(id, timeTypes);
  // }
}


const deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await scheduleService.deleteSchedule(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

export default {
  getAllScheduleByDate,
  getScheduleByDate,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
