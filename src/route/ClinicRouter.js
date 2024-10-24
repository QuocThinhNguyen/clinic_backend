import express from "express";
import clinicController from "../controllers/ClinicController.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

router.post('/', upload.single("image"), clinicController.createClinic)
router.put('/:id', upload.single("image"), clinicController.updateClinic)
router.get('/', clinicController.getAllClinic)
router.get('/:id', clinicController.getDetailClinic)
router.delete('/:id', clinicController.deleteClinic)
router.post('/filterClinic', clinicController.filterClinics)


export default router