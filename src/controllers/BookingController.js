import { query } from "express";
import bookingService from "../services/BookingService.js";

const getAllBooking = async (req, res) => {
  try {
    const { search, date, status, page = 1, limit = 10 } = req.query;
    let query = {};
    if (search) {
      query.name = search.replace(/\s+/g, " ").trim(); //Lọc theo tên nếu có
    }
    if (status) {
      query.status = status.replace(/\s+/g, " ").trim(); //Lọc theo trạng thái nếu có
    }
    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          message: "Invalid date format",
        });
      }
      query.appointmentDate = {
        $gte: new Date(date + "T00:00:00Z"),
        $lt: new Date(date + "T23:59:59Z"),
      };
    }
    const data = await bookingService.getAllBooking(query, page, limit);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!bookingId) {
      return res.status(200).json({
        status: "ERR",
        message: "The booking is required",
      });
    }
    const response = await bookingService.getBooking(bookingId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const data = req.body;
    const response = await bookingService.createBooking(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const data = req.body;
    if (!bookingId) {
      return res.status(200).json({
        status: "ERR",
        message: "The bookingId is required",
      });
    }
    const response = await bookingService.updateBooking(bookingId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const getBookingByDoctorId = async (req, res) => {
  try {
    const id = req.params.doctorId;
    const response = await bookingService.getBookingByDoctorId(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
}
export default {
  getAllBooking,
  getBooking,
  createBooking,
  updateBooking,
  getBookingByDoctorId
};
