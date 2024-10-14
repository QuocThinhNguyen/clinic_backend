import { handleResetPasswordTokenService, refreshTokenJwtService,createAndSendOTPService, generalOTPToken,
    verifyUserService} from '../services/JwtService.js'
import {createUserService, loginUserService, updateUserService, deleteUserService, getAllUserService, 
    getDetailsUserService, resetUserPasswordService} from '../services/UserService.js'

export const createUserController = async (req,res) => {
    try {
        const { fullname, email, password, confirmPassword, roleId } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!!email|| !password|| !confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is not email'
            })
        } else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is not equal confirmPassword'
            })
        }
        const response = await createUserService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const loginUserController = async (req,res) => {
    try {
        const { email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email|| !password){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is not email'
            })
        }
        const response = await loginUserService(req.body)
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            Secure: false,
            SameSite: 'Strict'
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const logoutUserController = async (req,res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const resetUserPasswordController = async (req,res) => {
    try {
        const email = req.body.email
        if(!email){
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is required'
            })
        }
        const response = await resetUserPasswordService(email)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const handleResetPasswordTokenController = async (req, res) => {
    const token = req.params.token;
    try {
        // Verify the token
        const response = await handleResetPasswordTokenService(token);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const createAndSendOTPController = async (req, res) => {
    try {
        const otp_token = await generalOTPToken(req.body.email)
        const response = await createAndSendOTPService(req.body, otp_token);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const verifyUserController = async (req, res) => {
    const otp_token = req.params.token
    const otpCode = req.body.otpCode
    try {
        const response = await verifyUserService(otpCode, otp_token);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const updateUserController = async (req,res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await updateUserService(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deleteUserController = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await deleteUserService(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const getAllUserController = async (req,res) => {
    try {
        const response = await getAllUserService()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const getDetailsUserController = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await getDetailsUserService(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const refreshToken = async (req,res) => {
    try {
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}