import express from "express";
import patientRecordsController from "../controllers/PatientRecordsController.js";
import { authUserMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authUserMiddleware, patientRecordsController.getAllPatientRecords);
router.get('/:id', patientRecordsController.getPatientRecordsById);
router.get('/patient/:patientId', patientRecordsController.getPatientRecordsByPatientId); // Định nghĩa tuyến đường mới
router.post('/', patientRecordsController.createPatientRecord);
router.put('/:id', patientRecordsController.updatePatientRecord);
router.delete('/:id', patientRecordsController.deletePatientRecord)

export default router;