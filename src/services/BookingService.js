import Booking from "../models/booking.js";
import Users from "../models/users.js";
import PatientRecords from "../models/patient_records.js";
import Schedules from "../models/schedule.js";

import Clinic from "../models/clinic.js";
import Specialty from "../models/specialty.js";
import DoctorInfo from "../models/doctor_info.js";

const getAllBookingByUserId = (userId, startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const patientRecords = await PatientRecords.find({ patientId: userId });
      if (patientRecords.length === 0) {
        return {
          status: "NOT_FOUND",
          message: "No patient records found for this user",
        };
      }

      const bookings = await Booking.find({
        patientRecordId: {
          $in: patientRecords.map((record) => record.patientRecordId),
        },
      })
        .populate({
          path: "patientRecordId",
          model: "PatientRecords",
          localField: "patientRecordId",
          foreignField: "patientRecordId",
          select:
            "fullname gender birthDate phoneNumber CCCD email job address ",
        })
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname",
        })
        .populate({
          path: "status",
          model: "AllCodes",
          localField: "status",
          foreignField: "keyMap",
          select: "valueEn valueVi",
        })
        .populate({
          path: "timeType",
          model: "AllCodes",
          localField: "timeType",
          foreignField: "keyMap",
          select: "valueEn valueVi",
        })

      console.log("bookings:", bookings);

      if (bookings.length === 0) {
        return {
          status: "NOT_FOUND",
          message: "No bookings found for this user",
        };
      }

      const detailedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const doctorInfo = await DoctorInfo.findOne({
            doctorId: booking.doctorId.userId,
          })
            .populate("specialtyId", "name description")
            .populate({
              path: "specialtyId",
              model: "Specialty",
              localField: "specialtyId",
              foreignField: "specialtyId",
              select: "name",
            })
            .populate({
              path: "clinicId",
              model: "Clinic",
              localField: "clinicId",
              foreignField: "clinicId",
              select: "name address",
            });

          return {
            ...booking._doc,
            doctorInfo: {
              specialty: doctorInfo?.specialtyId || null,
              clinic: doctorInfo?.clinicId || null,
            },
          };
        })
      );

      let result = [];
      if (startDate && endDate) {
        result = detailedBookings.filter((booking) => {
          const appointmentDate = new Date(booking.appointmentDate);
          if (appointmentDate >= sDate && appointmentDate <= eDate)
            return booking;
          else return null;
        });
      } else {
        result = detailedBookings;
      }

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


const getAllBooking = (query, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};
      let userId = [];
      let patientRecordId = [];
      if (query.name) {
        const users = await Users.find({
          fullname: { $regex: query.name, $options: "i" },
        });
        const patientRecords = await PatientRecords.find({
          fullname: { $regex: query.name, $options: "i" },
        });

        userId = users.map((user) => user.userId);
        patientRecordId = patientRecords.map(
          (patientRecord) => patientRecord.patientRecordId
        );
      }

      // Nếu không tìm thấy doctorId và patientRecordId phù hợp
      if (userId.length === 0 && patientRecordId.length === 0) {
        return resolve({
          status: "OK",
          message: "No bookings found",
          data: [],
          currentPage: page,
          limit: limit,
        });
      }

      if (userId.length > 0) {
        filter.doctorId = { $in: userId };
      }

      if (patientRecordId.length > 0) {
        filter.patientRecordId = { $in: patientRecordId };
      }
      if (query.status) {
        filter.status = { $regex: query.status, $options: "i" };
      }
      if (query.appointmentDate) {
        filter.appointmentDate = query.appointmentDate;
      }

      const allBookings = await Booking.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
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

      if (data.status === "S4") {
        const schedule = await Schedules.findOne({
          doctorId: checkBooking.doctorId,
          scheduleDate: checkBooking.appointmentDate.toISOString().split('T')[0],
          timeType: checkBooking.timeType
        });

        if (schedule) {
          schedule.currentNumber -= 1;
          await schedule.save();
        }
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

const getBookingByDoctorId = (doctorId,date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = {
        doctorId: doctorId
      };

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        query.appointmentDate = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      }
      const data = await Booking.find(query)
        .populate({
          path: "doctorId",
          model: "Users",
          localField: "doctorId",
          foreignField: "userId",
          select: "fullname",
        })
        .populate({
          path: "patientRecordId",
          model: "PatientRecords",
          localField: "patientRecordId",
          foreignField: "patientRecordId",
          select: "fullname gender birthDate phoneNumber CCCD email job address"
        })
        .populate({
          path:"status",
          model:"AllCodes",
          localField:"status",
          foreignField:"keyMap",
          select:"valueEn valueVi"
        })
        .populate({
          path:"timeType",
          model:"AllCodes",
          localField:"timeType",
          foreignField:"keyMap",
          select:"valueEn valueVi"
        })
      if (data.length === 0) {
        resolve({
          status: "ERR",
          message: "The booking is not defined",
        });
      } else {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

const patientBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.patientRecordId || !data.appointmentDate || !data.timeType) {
        resolve({
          status: "ERR",
          message: "Data is not enough",
        });
      } else {
        const existingBooking = await Booking.findOne({
          doctorId: data.doctorId,
          patientRecordId: data.patientRecordId,
          appointmentDate: data.appointmentDate,
          timeType: data.timeType,
          status: "S1"||"S2" || "S3"||"S4"
        })
        console.log(existingBooking);

        if (existingBooking) {
          resolve({
            status: "ERR",
            message: "This booking has already existed",
          });
        } else {
          const schedule = await Schedules.findOne({
            doctorId: data.doctorId,
            scheduleDate: data.appointmentDate,
            timeType: data.timeType
          });

          console.log(schedule);
          if (schedule) {
            if (schedule.currentNumber < schedule.maxNumber) {
              // schedule.currentNumber += 1;
              // await schedule.save();

              const newBooking = await Booking.create({
                doctorId: data.doctorId,
                patientRecordId: data.patientRecordId,
                appointmentDate: data.appointmentDate,
                timeType: data.timeType,
                price: data.price,
                reason: data.reason || '',
                status: 'S5'
              })
              await newBooking.save();

              resolve({
                status: "OK",
                message: "SUCCESS",
                data: newBooking,
              });
            } else {
              resolve({
                status: "ERR",
                message: "This schedule is full",
              });
            }
          } else {
            resolve({
              status: "ERR",
              message: "This schedule is not existed",
            });
          }
        }


      }
    } catch (e) {
      reject(e)
    }
  })
}

const patientBookingDirect = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.patientRecordId || !data.appointmentDate || !data.timeType) {
        resolve({
          status: "ERR",
          message: "Data is not enough",
        });
      } else {
        const existingBooking = await Booking.findOne({
          doctorId: data.doctorId,
          patientRecordId: data.patientRecordId,
          appointmentDate: data.appointmentDate,
          timeType: data.timeType,
          status: "S1"||"S2" || "S3"||"S4"
        })
        console.log(existingBooking);

        if (existingBooking) {
          resolve({
            status: "ERR",
            message: "This booking has already existed",
          });
        } else {
          const schedule = await Schedules.findOne({
            doctorId: data.doctorId,
            scheduleDate: data.appointmentDate,
            timeType: data.timeType
          });

          console.log(schedule);
          if (schedule) {
            if (schedule.currentNumber < schedule.maxNumber) {
              // schedule.currentNumber += 1;
              // await schedule.save();

              const newBooking = await Booking.create({
                doctorId: data.doctorId,
                patientRecordId: data.patientRecordId,
                appointmentDate: data.appointmentDate,
                timeType: data.timeType,
                price: data.price,
                reason: data.reason || '',
                status: 'S1'
              })
              await newBooking.save();

              resolve({
                status: "OK",
                message: "SUCCESS",
                data: newBooking,
              });
            } else {
              resolve({
                status: "ERR",
                message: "This schedule is full",
              });
            }
          } else {
            resolve({
              status: "ERR",
              message: "This schedule is not existed",
            });
          }
        }


      }
    } catch (e) {
      reject(e)
    }
  })
}

const updateBookingStatus = (bookingId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findOne({
        bookingId: bookingId
      });
      if (!booking) {
        resolve({
          status: "ERR",
          message: "The booking is not defined",
        });
      } else {
        booking.status = status;
        await booking.save();
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: booking,
        });
      }
    } catch (e) {
      reject(e)
    }
  })
}

const deleteBooking = async()=>{

}
const updateBookingPaymentUrl = async (bookingId, paymentUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { bookingId: bookingId },
        { paymentUrl: paymentUrl },
        { new: true }
      );

      if (!booking) {
        return resolve({
          status: "ERR",
          message: "Booking not found",
        });
      }

      resolve({
        status: "OK",
        message: "Payment URL updated successfully",
        data: booking,
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: "Error from server",
        error: e.message,
      });
    }
  });
};

export default {
  getAllBookingByUserId,
  getAllBooking,
  getBooking,
  createBooking,
  updateBooking,
  getBookingByDoctorId,
  patientBooking,
  updateBookingStatus,
  updateBookingPaymentUrl,
  patientBookingDirect
};
