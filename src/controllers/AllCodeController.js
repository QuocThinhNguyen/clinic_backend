import allCodeService from "../services/AllCodeService.js"

const createAllCode = async (req, res) => {
    try {
        const infor = await allCodeService.createAllCode(req.body);
        return res.status(200).json(infor);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const updateAllCode = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await allCodeService.updateAllCode(id, req.body);
        return res.status(200).json(info);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getAllCode = async (req, res) => {
    try {
        const data = await allCodeService.getAllCode();
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const deleteAllCode = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await allCodeService.deleteAllCode(id);
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

export default {
    createAllCode,
    updateAllCode,
    getAllCode,
    deleteAllCode
}