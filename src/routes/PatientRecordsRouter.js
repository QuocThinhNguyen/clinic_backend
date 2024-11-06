import express from "express";
import patientRecordsController from "../controllers/PatientRecordsController.js";
import { authUserMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authUserMiddleware, patientRecordsController.getAllPatientRecords);

export default router;