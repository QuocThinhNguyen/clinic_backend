import specialtyService from '../services/SpecialtyService.js';

const createSpecialty = async (req, res) => {
    try {
        const infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const updateSpecialty = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await specialtyService.updateSpecialty(id, req.body);
        return res.status(200).json(info);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getAllSpecialty = async (req, res) => {
    try {
        const data = await specialtyService.getAllSpecialty();
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getDetailSpecialty = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await specialtyService.getDetailSpecialty(id);
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const deleteSpecialty = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await specialtyService.deleteSpecialty(id);
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const filterSpecialty = async (req, res) => {
    try {
        const data = await specialtyService.filterSpecialty(req.body);
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
    createSpecialty,
    updateSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    deleteSpecialty,
    filterSpecialty
}