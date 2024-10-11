import { refreshTokenJwtService } from '../services/JwtService.js'
import {createUserService, loginUserService, updateUserService, deleteUserService, getAllUserService, 
    getDetailsUserService} from '../services/UserService.js'

export const createUserController = async (req,res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!name || !email|| !password|| !confirmPassword|| !phone){
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
        res.status(404).json({
            message: e
        })
    }
}

export const loginUserController = async (req,res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
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
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
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
        res.status(404).json({
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
        res.status(404).json({
            message: e
        })
    }
}

export const getAllUserController = async (req,res) => {
    try {
        const response = await getAllUserService()
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
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
        res.status(404).json({
            message: e
        })
    }
}

export const refreshToken = async (req,res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        res.status(404).json({
            message: e
        })
    }
}