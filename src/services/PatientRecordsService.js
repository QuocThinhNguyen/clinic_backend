import PatientRecords from "../models/patient_records.js";

const getAllPatientRecords = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allPatientRecords = await PatientRecords.find({});

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allPatientRecords,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPatientRecordsById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await PatientRecords.findOne({
        patientRecordId: id
      })
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "Patient Record is not defined"
        })
      }
      resolve({
        errCode: 0,
        message: "Get patient record successfully",
        data: data
      })
    } catch (e) {
      reject(e)
    }
  })
}

const createPatientRecord = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.patientId || !data.fullname || !data.gender || !data.birthDate || !data.phoneNumber || !data.CCCD || !data.email || !data.job || !data.address) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields"
        })
      } else {
        await PatientRecords.create({
          patientId: data.patientId,
          fullname: data.fullname,
          gender: data.gender,
          birthDate: data.birthDate,
          phoneNumber: data.phoneNumber,
          CCCD: data.CCCD,
          email: data.email,
          job: data.job,
          address: data.address
        })
        resolve({
          errCode: 0,
          message: "Create patient record successfully"
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const updatePatientRecord = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {

      const checkRecord = await PatientRecords.findOne({
        patientRecordId: id
      })

      if (!checkRecord) {
        resolve({
          errCode: 2,
          errMessage: "Patient Record is not defined"
        });
      }

      await PatientRecords.updateOne(
        { patientRecordId: id },
        data,
        { new: true }
      )

      resolve({
        errCode: 0,
        message: "Update patient records successfully"
      })
    } catch (e) {
      reject(e)
    }
  })
}

const deletePatientRecord = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findRecord = await PatientRecords.findOne({
        patientRecordId: id
      })

      if (!findRecord) {
        resolve({
          errCode: 2,
          errMessage: "Patient record is not defined"
        })
      }

      await PatientRecords.deleteOne({
        patientRecordId: id
      })

      resolve({
        errCode: 0,
        message: "Delete patient record successfully"
      })
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  getAllPatientRecords,
  getPatientRecordsById,
  createPatientRecord,
  updatePatientRecord,
  deletePatientRecord
};
