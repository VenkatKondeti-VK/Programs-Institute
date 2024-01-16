import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'


export const signIn = async (req, res, next) => {
    const admin = {
        id: 1234,
        fullName: "Admin",
        mail: 'admin123@gmail.com',
        password: 'Admin@1234',
    }

    const {email, password} = req.body

    try {
        if(email !== admin.mail || password !== admin.password){
            return next(errorHandler(401, 'Bad Credentials'))
        }

        const token = jwt.sign({id: admin.id}, process.env.JWT_SECRET)

        const {password: pass, ...rest} = admin

        res.cookie('access_token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).status(200).json(rest)
    } 
    catch (error) {
        next(error)
    }
}