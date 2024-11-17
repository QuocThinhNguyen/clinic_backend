import doctorInfor from '../models/doctor_info.js';
import users from '../models/users.js';
import specialties from '../models/specialty.js';
import clinics from '../models/clinic.js';
import allcodes from '../models/allcodes.js';

const getDoctorInfor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm tài liệu doctor_info dựa trên doctorId
            
            const doctorData = await doctorInfor.findOne({ doctorId: id });
            if (!doctorData) {
                resolve({
                    errCode: 1,
                    errMessage: "Cannot find doctor"
                });
                return;
            }

            const userData = await users.findOne({ userId: doctorData.doctorId });
            const specialtyData = await specialties.findOne({ specialtyId: doctorData.specialtyId });
            const clinicData = await clinics.findOne({ clinicId: doctorData.clinicId });
            const allCodeData = await allcodes.findOne({ keyMap: doctorData.position });

            const combinedData = {
                doctorId: doctorData.doctorId,
                email: userData.email,
                fullname: userData.fullname,
                address: userData.address,
                gender: userData.gender,
                phoneNumber: userData.phoneNumber,
                birthDate: userData.birthDate,
                image: userData.image,
                specialtyName: specialtyData.name,
                clinicName: clinicData.name,
                addressClinic: clinicData.address,
                price: doctorData.price,
                note: doctorData.note,
                description: doctorData.description,
                position : allCodeData.valueVi
            };

            resolve({
                errCode: 0,
                errMessage: "Success",
                data: combinedData
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allDoctor = await doctorInfor.find({})
                .populate({
                    path: 'doctorId',
                    model: 'Users',
                    localField: 'doctorId',
                    foreignField: 'userId',
                    select: 'email fullname address gender birthDate phoneNumber image'
                })
                .populate({
                    path: 'specialtyId',
                    model: 'Specialty',
                    localField: 'specialtyId',
                    foreignField: 'specialtyId',
                    select: 'name'
                })
                .populate({
                    path: 'clinicId',
                    model: 'Clinic',
                    localField: 'clinicId',
                    foreignField: 'clinicId',
                    select: 'name address'
                })
            // .populate({
            //     path: 'position',
            //     model: 'Allcodes',
            //     localField: 'position',
            //     foreignField: 'keyMap',
            //     select: 'value'
            // })

            resolve({
                errCode: 0,
                errMessage: "Success",
                data: allDoctor
            })
        } catch (e) {
            reject(e);
        }
    })
}

const updateDoctorInfor = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const doctorData = await doctorInfor.findOne({ doctorId: id });
            if (!doctorData) {
                resolve({
                    errCode: 1,
                    errMessage: "Cannot find doctor"
                });
                return;
            }

            const userData = await users.findOne({ userId: doctorData.doctorId });
            const specialtyData = await specialties.findOne({ specialtyId: doctorData.specialtyId });
            const clinicData = await clinics.findOne({ clinicId: doctorData.clinicId });

            const updateUser = await users.updateOne(
                { userId: id },
                data,
                { new: true }
            );

            if (!updateUser) {
                resolve({
                    errCode: 1,
                    errMessage: "Cannot update user"
                });
                return;
            }

            const updateDoctorInfor = await doctorInfor.updateOne(
                { doctorId: id },
                data,
                { new: true }
            );

            if (!updateDoctorInfor) {
                resolve({
                    errCode: 1,
                    errMessage: "Cannot update doctor information"
                });
                return;
            }

            resolve({
                errCode: 0,
                errMessage: "Update doctor information successfully",
                data: {
                    user: updateUser,
                    doctorInfor: updateDoctorInfor
                }
            })

        } catch (e) {
            reject(e);
        }
    })
}

const searchDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const query = {
            //     roleID: 'R2'
            // };
            // if (data) {
            //     query.fullname = { $regex: data, $options: 'i' }; // 'i' để không phân biệt chữ hoa chữ thường
            // }
            const doctorFind = await users.find({
                roleId: 'R2',
                $or: [
                    { fullname: { $regex: data, $options: 'i' } }
                ]
            });

            if (doctorFind.length === 0) {
                resolve({
                    errCode: 1,
                    errMessage: "No clinic found"
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "Filter clinic successfully",
                    data: doctorFind
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
}



export default {
    getDoctorInfor,
    updateDoctorInfor,
    searchDoctor,
    getAllDoctor
};