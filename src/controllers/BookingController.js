import bookingService from "../services/BookingService.js";

const getAllBooking = async (req, res) => {
  try {
    const data = await bookingService.getAllBooking();
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
    console.log("bookingId:",bookingId);
    
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
}

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
    console.log("Lỗi");
    
    return res.status(404).json({
      message: e.message,
    });
  }
};

export default {
  getAllBooking,
  getBooking,
  createBooking,
  updateBooking,
};
