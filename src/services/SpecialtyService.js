import Specialty from '../models/specialty.js';
import DoctorInfo from "../models/doctor_info.js";

const createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.description || !data.image || !data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required fields",
        });
      } else {
        await specialty.create({
          name: data.name,
          image: data.image,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "Create speacialty successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateSpecialty = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSpecialty = await specialty.findOne({
        specialtyId: id,
      });

      if (!checkSpecialty) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }

      await specialty.updateOne({ specialtyId: id }, data, { new: true });

      resolve({
        errCode: 0,
        message: "Update specialty successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllSpecialty = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 6;
      let formatQuery = {};
      // Sử dụng biểu thức chính quy để tìm kiếm không chính xác
      if (query.query) {
        formatQuery = {
          name: { $regex: query.query, $options: "i" },
        };
      }
      const specialties = await specialty
        .find(formatQuery)
        .skip((page - 1) * limit)
        .limit(limit);
      const totalSpecialties = await specialty.countDocuments(formatQuery);
      const totalPages = Math.ceil(totalSpecialties / limit);
      resolve({
        errCode: 0,
        message: "Get all specialty successfully",
        data: specialties,
        totalPages,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialtyData = await specialty.findOne({
        specialtyId: id,
      });
      if (!specialtyData) {
        resolve({
          errCode: 2,
          errMessage: "Specialty is not defined",
        });
      }
      resolve({
        errCode: 0,
        message: "Get specialty successfully",
        data: specialtyData,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findSpecialty = await specialty.findOne({
        specialtyId: id,
      });

      if (!findSpecialty) {
        resolve({
          errCode: 2,
          errMessage: "Specialty is not defined",
        });
      }

      await specialty.deleteOne({
        specialtyId: id,
      });

      resolve({
        errCode: 0,
        message: "Delete specialty successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const filterSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Sử dụng biểu thức chính quy để tìm kiếm không chính xác
      const query = {};
      if (data.name) {
        query.name = { $regex: data.name, $options: "i" }; // 'i' để không phân biệt chữ hoa chữ thường
      }

      const specialtyData = await specialty.find(query);

      if (specialtyData.length === 0) {
        resolve({
          errCode: 1,
          message: "No specialty found",
        });
      } else {
        resolve({
          errCode: 0,
          message: "Filter specialty successfully",
          data: specialtyData,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDropdownSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialties = await specialty.find();
      resolve({
        errCode: 0,
        message: "Get dropdown specialty successfully",
        data: specialties,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getSpecialtyByClinicId = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctorInfos = await DoctorInfo.find({ clinicId }).populate({
        path: "specialtyId",
        model: "Specialty",
        localField: "specialtyId",
        foreignField: "specialtyId",
        select: "specialtyId name image",
      }); // Sử dụng populate để lấy thông tin specialty liên quan

      // Chuyển các specialtyId đã được populate thành một mảng các specialty
      const specialties = [
        ...new Map(
          doctorInfos.map((doc) => [
            doc.specialtyId.specialtyId,
            doc.specialtyId,
          ])
        ).values(),
      ];

      resolve({
        errCode: 0,
        message: "Get specialty by clinicId successfully",
        data: specialties,
      });
    } catch (e) {
      reject(e);
    }
  });
};


export default {
  createSpecialty,
  updateSpecialty,
  getAllSpecialty,
  getDetailSpecialty,
  deleteSpecialty,
  filterSpecialty,
  getDropdownSpecialty,
  getSpecialtyByClinicId,
};

