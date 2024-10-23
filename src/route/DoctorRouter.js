import express from 'express';
import doctorController from '../controllers/DoctorController.js';

const router = express.Router();

router.get('/search', doctorController.searchDoctor);
router.get('/', doctorController.getAllDoctor);
router.get('/:id', doctorController.getDoctorInfor);
router.put('/:id', doctorController.updateDoctorInfor);


export default router;