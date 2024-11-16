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

const getPatientRecordsById = async (req, res) => {
  try {
    const data = await patientRecordsService.getPatientRecordsById(req.params.id);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
}

const createPatientRecord = async (req, res) => {
  try {
    const infor = await patientRecordsService.createPatientRecord(req.body);
    return res.status(200).json(infor);
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server"
    })
  }
}

const updatePatientRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const infor = await patientRecordsService.updatePatientRecord(id, req.body);
    return res.status(200).json(infor);
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server"
    })
  }
}

const deletePatientRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await patientRecordsService.deletePatientRecord(id);
    return res.status(200).json(data)
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server"
    })
  }
}
const getPatientRecordsByPatientId = async (req, res) => {
  try {
    const data = await patientRecordsService.getPatientRecordsByPatientId(req.params.patientId);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

export default {
  getAllPatientRecords,
  getPatientRecordsById,
  createPatientRecord,
  updatePatientRecord,
  deletePatientRecord,
  getPatientRecordsByPatientId
}