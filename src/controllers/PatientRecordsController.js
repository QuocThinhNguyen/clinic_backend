import patientRecordsService from '../services/PatientRecordsService.js';

const getAllPatientRecords = async (req, res) => {
  try {
    const data = await patientRecordsService.getAllPatientRecords();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
}

export default {
  getAllPatientRecords,
}