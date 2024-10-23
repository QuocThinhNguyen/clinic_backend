import doctorInforService from '../services/DoctorService.js';

const getDoctorInfor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const info = await doctorInforService.getDoctorInfor(doctorId);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const data = await doctorInforService.getAllDoctor();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const updateDoctorInfor = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await doctorInforService.updateDoctorInfor(id, req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

const searchDoctor = async (req, res) => {
    try {
        const keyword = req.query.keyword.replace(/\s+/g, ' ').trim();
        const result = await doctorInforService.searchDoctor(keyword);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
export default {
    getDoctorInfor,
    updateDoctorInfor,
    searchDoctor,
    getAllDoctor
}