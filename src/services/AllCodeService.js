import allCode from "../models/allcodes.js";

const createAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.keyMap || !data.type || !data.valueEn || !data.valueVi) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required fields"
                })
            } else {
                await allCode.create({
                    keyMap: data.keyMap,
                    type: data.type,
                    valueEn: data.valueEn,
                    valueVi: data.valueVi
                })
                resolve({
                    errCode: 0,
                    message: "Create allcode successfully"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateAllCode = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const checkAllCode = await allCode.findOne({
                id: id
            })

            if (!checkAllCode) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            await allCode.updateOne(
                { id: id },
                data,
                { new: true }
            )

            resolve({
                errCode: 0,
                message: "Update allcode successfully"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCode = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allcodes = await allCode.find()
            resolve({
                errCode: 0,
                message: "Get allcode successfully",
                data: allcodes
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteAllCode = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findAllCode = await allCode.findOne({
                id: id
            })

            if (!findAllCode) {
                resolve({
                    errCode: 2,
                    errMessage: "Allcode is not defined"
                })
            }

            await allCode.deleteOne({
                id: id
            })

            resolve({
                errCode: 0,
                message: "Delete allcode successfully"
            })
        } catch (e) {
            reject(e)
        }
    })
}

export default {
    createAllCode,
    updateAllCode,
    getAllCode,
    deleteAllCode
}