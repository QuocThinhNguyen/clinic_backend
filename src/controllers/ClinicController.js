import clinicService from "../services/ClinicService.js"

const createClinic = async (req, res) => {
    try {
        const image = req.file ? `${req.file.filename}` : null;
        const clinicData = {
            ...req.body,
            image
        }

        const infor = await clinicService.createClinic(clinicData);
        return res.status(200).json(infor);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const updateClinic = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await clinicService.updateClinic(id, req.body);
        return res.status(200).json(info);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getAllClinic = async (req, res) => {
    try {
        const data = await clinicService.getAllClinic();
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getDetailClinic = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await clinicService.getDetailClinic(id);
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const deleteClinic = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await clinicService.deleteClinic(id);
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const filterClinics = async (req, res) => {
    try {
        const data = await clinicService.filterClinics(req.body);
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
    createClinic,
    updateClinic,
    getAllClinic,
    getDetailClinic,
    deleteClinic,
    filterClinics
}