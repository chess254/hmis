const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.createPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);
router.get('/:id/visits', PatientController.getPatientVisits);

module.exports = router;