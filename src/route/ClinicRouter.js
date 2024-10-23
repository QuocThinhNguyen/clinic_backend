import express from "express";
import clinicController from "../controllers/ClinicController.js";

const router = express.Router();

router.post('/', clinicController.createClinic)
router.put('/:id', clinicController.updateClinic)
router.get('/', clinicController.getAllClinic)
router.get('/:id', clinicController.getDetailClinic)
router.delete('/:id', clinicController.deleteClinic)
router.post('/filterClinic', clinicController.filterClinics)


export default router