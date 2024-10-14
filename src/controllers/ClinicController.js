import clinicService from "../services/ClinicService.js"

const createClinic = async (req, res) => {
    try {
        const infor = await clinicService.createClinic(req.body);
        return res.status(200).json(infor);
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

export default {
    createClinic
}