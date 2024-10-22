import express from "express";
import patientRecordsController from "../controllers/PatientRecordsController.js";

const router = express.Router();

router.get("/", patientRecordsController.getAllPatientRecords);

export default router;