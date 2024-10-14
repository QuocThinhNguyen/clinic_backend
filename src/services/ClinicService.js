import clinic from "../models/clinic.js"

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.address || !data.description || !data.image || !data.name || !data.email || !data.phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required fields"
                })
            } else {
                await clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.image,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    image: data.image,
                    description: data.description
                })
                resolve({
                    errCode: 0,
                    message: "Create clinic successfully"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateClinic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const checkClinic = await clinic.findOne({
                clinicId: id
            })

            if (!checkClinic) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            await clinic.updateOne(
                { clinicId: id },
                data,
                { new: true }
            )

            resolve({
                errCode: 0,
                message: "Update clinic successfully"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinics = await clinic.find()
            resolve({
                errCode: 0,
                message: "Get all clinic successfully",
                data: clinics
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinicData = await clinic.findOne({
                clinicId: id
            })
            if (!clinicData) {
                resolve({
                    errCode: 2,
                    errMessage: "Clinic is not defined"
                })
            }
            resolve({
                errCode: 0,
                message: "Get clinic successfully",
                data: clinicData
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findClinic = await clinic.findOne({
                clinicId: id
            })

            if (!findClinic) {
                resolve({
                    errCode: 2,
                    errMessage: "Clinic is not defined"
                })
            }

            await clinic.deleteOne({
                clinicId: id
            })

            resolve({
                errCode: 0,
                message: "Delete clinic successfully"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const filterClinics = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Sử dụng biểu thức chính quy để tìm kiếm không chính xác
            const query = {};
            if (data.name) {
                query.name = { $regex: data.name, $options: 'i' }; // 'i' để không phân biệt chữ hoa chữ thường
            }
            if (data.address) {
                query.address = { $regex: data.address, $options: 'i' };
            }
            // Thêm các điều kiện tìm kiếm khác nếu cần

            const clinics = await clinic.find(query);
            resolve({
                errCode: 0,
                message: "Filter clinic successfully",
                data: clinics
            });

        } catch (e) {
            reject(e);
        }
    });
};

export default {
    createClinic,
    updateClinic,
    getAllClinic,
    getDetailClinic,
    deleteClinic,
    filterClinics
}