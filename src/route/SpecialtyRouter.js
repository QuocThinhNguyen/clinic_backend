import express from 'express';
import specialtyController from '../controllers/SpecialtyController.js';
import upload from "../utils/fileUpload.js";


const router = express.Router();

router.post('/', upload.single("image"), specialtyController.createSpecialty)
router.put('/:id', specialtyController.updateSpecialty)
router.get('/', specialtyController.getAllSpecialty)
router.get('/:id', specialtyController.getDetailSpecialty)
router.delete('/:id', specialtyController.deleteSpecialty)
router.post('/filterClinic', specialtyController.filterSpecialty)

export default router