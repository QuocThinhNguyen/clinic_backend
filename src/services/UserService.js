import User from "../models/users.js";
import bcrypt from "bcrypt";
import {
  generalAccessToken,
  generalRefreshToken,
  generalResetPasswordToken,
} from "./JwtService.js";
import dotenv from "dotenv";
import sendMail from "../utils/sendMail.js";
dotenv.config();

export const createUserService = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const {
      email,
      password,
      fullname,
      gender,
      birthDate,
      address,
      phoneNumber,
      image,
      roleId,
    } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already exists!",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        email,
        password: hash,
        fullname,
        gender,
        birthDate,
        address,
        phoneNumber,
        image,
        isVerified: true,
        roleId,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const loginUserService = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The email is not defined",
        });
      } else {
        if (!checkUser.isVerified) {
          resolve({
            status: "ERR",
            message: "The email is not verified",
          });
        }
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The user or password is incorrect",
        });
      }

      const access_token = await generalAccessToken({
        userId: checkUser.userId,
        roleId: checkUser.roleId,
      });

      const refresh_token = await generalRefreshToken({
        userId: checkUser.userId,
        roleId: checkUser.roleId,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const resetUserPasswordService = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await User.findOne({
        email: email,
      });
      if (checkEmail === null) {
        resolve({
          status: "ERR",
          message: "The email is not defined",
        });
      }

      // Create reset password token
      const token = await generalResetPasswordToken(email);
      // Create reset password link
      const resetLink = `${process.env.WEB_LINK}/user/reset-password/${token}`;
      // Create text
      const text = `Click the link to reset your password: ${resetLink}`;
      const subject = "Reset password";
      sendMail(email, text, subject);

      resolve({
        status: "OK",
        message: "Password reset link has been sent to your email",
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const {
      password,
      fullname,
      gender,
      birthDate,
      address,
      phoneNumber,
      image,
      roleId,
    } = data;
    try {
      const checkUser = await User.findOne({
        userId: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      // const hash = bcrypt.hashSync(password, 10);
      const updateData = {};
      if (data.password)
        updateData.password = bcrypt.hashSync(data.password, 10);
      if (data.fullname) updateData.fullname = data.fullname;
      if (data.gender) updateData.gender = data.gender;
      if (data.birthDate) updateData.birthDate = data.birthDate;
      if (data.address) updateData.address = data.address;
      if (data.phoneNumber) updateData.phoneNumber = data.phoneNumber;
      if (data.image) updateData.image = data.image;
      if (data.roleId) updateData.roleId = data.roleId;

      const updatedUser = await User.findOneAndUpdate(
        { userId: id }, // Điều kiện tìm kiếm
        updateData, // Giá trị cần cập nhật
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        userId: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findOneAndDelete({ userId: id });
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const getAllUserService = (skip, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find({}).skip(skip).limit(limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allUsers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const getDetailsUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        userId: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const getUserByNameOrEmailService = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.find({
        $or: [
          { fullname: { $regex: keyword, $options: "i" } }, // Tìm kiếm không phân biệt hoa thường
          { email: { $regex: keyword, $options: "i" } }, // Tìm kiếm không phân biệt hoa thường
        ],
      });
      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
