import express from "express";
import clinicController from "../controllers/ClinicController.js";

const router = express.Router();

router.post('/createClinic', clinicController.createClinic)


export default router