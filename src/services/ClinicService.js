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
                clinicID: id
            })
            if (!checkClinic) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            const updateClinic = await clinic.updateOne(
                { clinicID: id },
                data,
                { new: true }
            )

        } catch (e) {
            reject(e)
        }
    })
}

export default {
    createClinic,
    updateClinic
}