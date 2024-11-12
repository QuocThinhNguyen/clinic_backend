import express from "express";
import bookingController from "../controllers/BookingController.js";
import { authUserMiddleware, authAdminMiddleware, authDoctorMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/book-appointment", authUserMiddleware, bookingController.patientBooking);
// router.get("/vnpay_return", bookingController.handlePaymentReturn);
router.get("/momo_return", authUserMiddleware, bookingController.handlePaymentReturn); // Định nghĩa tuyến đường để xử lý phản hồi từ MoMo
router.post("/allbooking", authMiddleware, bookingController.getAllBookingByUserId);
router.get("/", authAdminMiddleware, bookingController.getAllBooking);//get all và theo trạng thái ?status=...
router.get("/:id", authAdminMiddleware, bookingController.getBooking);
router.get("/doctor/:doctorId", authDoctorMiddleware, bookingController.getBookingByDoctorId)
// router.post("/", bookingController.createBooking);// create booking
router.put("/:id", authMiddleware, bookingController.updateBooking);

export default router;
