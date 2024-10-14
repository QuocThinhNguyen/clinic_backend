import clinic from "../models/clinic.js"

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.address || !data.description || !data.image || !data.name) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required fields"
                })
            } else {
                await clinic.create({
                    name: data.name,
                    address: data.address,
                    description: data.description,
                    image: data.image
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

const updataClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            }

            const clinic = await clinic.findOne({

            })

        } catch (e) {
            reject(e)
        }
    })
}

export default {
    createClinic
}