import express from "express";
import clinicController from "../controllers/ClinicController.js";

const router = express.Router();

router.post('/createClinic', clinicController.createClinic)
router.put('/updateClinic/:id', clinicController.updateClinic)
router.get('/getAllClinic', clinicController.getAllClinic)
router.get('/getDetailClinic/:id', clinicController.getDetailClinic)
router.delete('/deleteClinic/:id', clinicController.deleteClinic)
router.post('/filterClinic', clinicController.filterClinics)


export default router