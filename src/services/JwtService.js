import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '20s' })

    return access_token
}

export const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
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
                const { payload } = user
                const access_token = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
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