import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import dotenv from 'dotenv'
dotenv.config()

export const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '25s' })

    return access_token
}

export const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

export const generalResetPasswordToken = async (email) => {
    const reset_password_token = jwt.sign({
        email: email
    }, process.env.SECRET_KEY, { expiresIn: '15m' })

    return reset_password_token
}

export const handleResetPasswordTokenService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const tempPassword = crypto.randomBytes(8).toString('hex').slice(0, 8);
            const hash = bcrypt.hashSync(tempPassword, 10)
            await User.findOneAndUpdate(
                { email: decoded.email },  // Điều kiện tìm kiếm
                {password: hash},  // Giá trị cần cập nhật
                { new: true }
            )
            resolve({
                status: 'OK',
                message: `Token is valid. Your new password of ${decoded.email} is ${tempPassword}`,
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication'
                    })
                }
                const access_token = await generalAccessToken({
                    userId: user?.userId,
                    roleId: user?.roleId
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                })
            })


        } catch (e) {
            reject(e)
        }
    })
}