import express from 'express';
import doctorController from '../controllers/DoctorController.js';
import upload from "../utils/fileUpload.js";
import { authAdminMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/search', doctorController.searchDoctor);
router.get('/', doctorController.getAllDoctor);
router.get('/:id', doctorController.getDoctorInfor);
router.put('/:id', authAdminMiddleware, upload.single("image"), doctorController.updateDoctorInfor);

export default router;