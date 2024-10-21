import Booking from "../models/booking.js";

const getAllBooking = (query, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allBookings = await Booking.find({
        status: { $regex: query.status, $options: "i" },
        appointmentDate: query.appointmentDate,
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("doctorId", "fullname email")
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname email",
        })
        .populate({
          path: "patientRecordId",
          model: "PatientRecords",
          localField: "patientRecordId",
          foreignField: "patientRecordId",
          select: "fullname gender phoneNumber birthDate",
        });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allBookings,
        currentPage: page,
        limit: limit,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findOne({
        bookingId: id,
      })
        .populate("doctorId", "fullname email")
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname email",
        })
        .populate({
          path: "patientRecordId",
          model: "PatientRecords",
          localField: "patientRecordId",
          foreignField: "patientRecordId",
          select: "fullname gender phoneNumber birthDate",
        });
      if (booking === null) {
        resolve({
          status: "ERR",
          message: "The booking is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: booking,
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

const createBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooking = await Booking.create(data);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: newBooking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateBooking = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBooking = await Booking.findOne({
        bookingId: id,
      });
      if (checkBooking === null) {
        resolve({
          status: "ERR",
          message: "The booking is not defined",
        });
      }

      const updatedBooking = await Booking.findOneAndUpdate(
        { bookingId: id }, // Điều kiện tìm kiếm
        data, // Giá trị cần cập nhật
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedBooking,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getAllBooking,
  getBooking,
  createBooking,
  updateBooking,
};
