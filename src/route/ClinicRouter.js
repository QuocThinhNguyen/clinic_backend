import express from "express";
import clinicController from "../controllers/ClinicController.js";
import upload from "../utils/fileUpload.js";
import { authUserMiddleware, authAdminMiddleware, authDoctorMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authAdminMiddleware, upload.single("image"), clinicController.createClinic)
router.put('/:id', authAdminMiddleware, upload.single("image"), clinicController.updateClinic)
router.get('/', clinicController.getAllClinic)
router.get('/:id', clinicController.getDetailClinic)
router.delete('/:id', authAdminMiddleware, clinicController.deleteClinic)
router.post('/filterClinic', clinicController.filterClinics)


export default router