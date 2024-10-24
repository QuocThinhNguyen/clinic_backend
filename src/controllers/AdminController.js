import adminService from "../services/AdminService.js";

const adminHomePage = async (req, res) => {
    try {
      // if (!token) {
      //   return res.status(200).json({
      //     status: "ERR",
      //     message: "The token is required",
      //   });
      // }
      const response = await adminService.adminHomePage();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

export default {adminHomePage}