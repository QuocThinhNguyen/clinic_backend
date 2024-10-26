import express from "express";
import bookingController from "../controllers/BookingController.js";

const router = express.Router();

router.post("/book-appointment", bookingController.patientBooking);
router.get("/vnpay_return", bookingController.handlePaymentReturn);
router.get("/momo_return", bookingController.handlePaymentReturn); // Định nghĩa tuyến đường để xử lý phản hồi từ MoMo
router.get("/", bookingController.getAllBooking);//get all và theo trạng thái ?status=...
router.get("/:id", bookingController.getBooking);
router.get("/doctor/:doctorId", bookingController.getBookingByDoctorId)
// router.post("/", bookingController.createBooking);// create booking
router.put("/:id", bookingController.updateBooking);








export default router;
