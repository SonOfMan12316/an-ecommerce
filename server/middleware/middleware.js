import UserModel from '../model/User.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function auth(req, res, callback) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decodedToken
        callback()
    } catch (err) {
        res.status(401).send(err)
    }
}

export async function verifyUser(req, res, callback) {
    try {
        const { username } = req.method === 'GET' ? req.query : req.body

        let isUsernameExist = await UserModel.findOne({ username })
        if (!isUsernameExist) return res.status(404).send({ error: 'Username Not Found' })
        callback()
    } catch (error) {
        return res.status(404).send(error)
    }
}

export async function localVariables(req, res, callback) {
    try {
        const localData = {
            OTP: null,
            resetSession: false,
        };
        req.app.locals = localData;
        callback();
    } catch (err) {
        return res.status(401)
    }
}