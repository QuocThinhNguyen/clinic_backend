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

export default {
  getAllPatientRecords,
};
