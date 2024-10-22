import express from 'express';
import specialtyController from '../controllers/SpecialtyController.js';

const router = express.Router();

router.post('/', specialtyController.createSpecialty)
router.put('/:id', specialtyController.updateSpecialty)
router.get('/', specialtyController.getAllSpecialty)
router.get('/:id', specialtyController.getDetailSpecialty)
router.delete('/:id', specialtyController.deleteSpecialty)
router.post('/filterClinic', specialtyController.filterSpecialty)

export default router