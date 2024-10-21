import express from "express";
import bookingController from "../controllers/BookingController.js";

const router = express.Router();

// router.get("/search", bookingController.getUserByNameOrEmailController);
router.get("/", bookingController.getAllBooking);
router.get("/:id", bookingController.getBooking);
// router.post("/", bookingController.createBooking);// create booking
router.put("/:id", bookingController.updateBooking);

export default router;
