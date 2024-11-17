import express from 'express';
import specialtyController from '../controllers/SpecialtyController.js';
import upload from "../utils/fileUpload.js";
import { authUserMiddleware, authAdminMiddleware, authDoctorMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/dropdown', specialtyController.getDropdownSpecialty)
router.post('/', authAdminMiddleware, upload.single("image"), specialtyController.createSpecialty)
router.put('/:id', authAdminMiddleware, upload.single("image"), specialtyController.updateSpecialty)
router.get('/', specialtyController.getAllSpecialty)
router.get('/:id', specialtyController.getDetailSpecialty)
router.delete('/:id', authAdminMiddleware, specialtyController.deleteSpecialty)
router.post('/filterClinic', specialtyController.filterSpecialty)

export default router