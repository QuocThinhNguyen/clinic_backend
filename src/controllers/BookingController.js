import { query } from "express";
import bookingService from "../services/BookingService.js";
import paymentService from '../services/PaymentService.js';
import querystring from 'qs';
import crypto from 'crypto';
import vnpayConfig from '../config/vnpayConfig.js';
import { log } from "console";


const getAllBookingByUserId = async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const userId = req.body.userId;
  if (!userId) {
    return res.status(200).json({
      status: "ERR",
      message: "The user is required",
    });
  }
  const response = await bookingService.getAllBookingByUserId(userId, startDate, endDate);
  return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
    
  }
  

}

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
    const { doctorId } = req.params;
    const { date } = req.query; // Lấy tham số ngày từ query string

    const result = await bookingService.getBookingByDoctorId(doctorId, date);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERR",
      message: "Error from server",
    });
  }
}

// const patientBooking = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log(data);
//     const result = await bookingService.patientBooking(data);
//     return res.status(200).json(result);
//   } catch (e) {
//     return res.status(404).json({
//       message: e.message,
//     });
//   }
// }

const patientBooking = async (req, res) => {
  try {
    const data = req.body;
    const result = await bookingService.patientBooking(data);
    if (result.status === "OK") {
      // console.log("IDDDD:", result.data.bookingId, typeof result.data.bookingId.toString());

      const paymentUrl = await paymentService.createPaymentUrl(result.data.bookingId.toString(), result.data.price, 'Payment for booking');
      return res.status(200).json({
        status: "OK",
        message: "Booking created successfully",
        paymentUrl: paymentUrl
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERR",
      message: "Error from server",
    });
  }
};

const patientBookingDirect = async (req, res) => {
  try {
    const data = req.body;
    const result = await bookingService.patientBookingDirect(data);
    if (result.status === "OK") {
      // console.log("IDDDD:", result.data.bookingId, typeof result.data.bookingId.toString());

      const paymentUrl = await paymentService.createPaymentUrl(result.data.bookingId.toString(), result.data.price, 'Payment for booking');
      return res.status(200).json({
        status: "OK",
        message: "Booking created successfully",
        paymentUrl: paymentUrl
      });
    } else {
      return res.status(400).json(result);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "ERR",
      message: "Error from server",
    });
  }
};

const handlePaymentReturn = async (req, res) => {
  console.log('TEST HANDLE PAYMENT RETURN'); 
  console.log('Response',res);
  return paymentService.handlePaymentReturn(req, res);
  // try {
  //   const { orderId, resultCode } = req.query;
  //   console.log(req.query);
  //   const bookingId = orderId.split('_')[0]; // Sử dụng orderId làm bookingId
  //   const paymentStatus = resultCode === '0' ? 'success' : 'failed';

  //   if (paymentStatus === 'success') {
  //     await bookingService.updateBookingStatus(bookingId, 'S2');
  //     return res.status(200).json({
  //       status: "OK",
  //       message: "Payment successful",
  //     });
  //   } else {
  //     return res.status(400).json({
  //       status: "ERR",
  //       message: "Payment failed",
  //     });
  //   }
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({
  //     status: "ERR",
  //     message: "Error from server",
  //   });
  // }
};

export default {
  getAllBookingByUserId,
  getAllBooking,
  getBooking,
  createBooking,
  updateBooking,
  getBookingByDoctorId,
  patientBooking,
  handlePaymentReturn,
  patientBookingDirect
};
