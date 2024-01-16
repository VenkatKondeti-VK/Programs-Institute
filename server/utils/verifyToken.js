import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    // if no token present (not logged in)
    if(!token){
        return next(errorHandler(401, 'Unauthorized'))
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Invalid User
        if(err){
            return next(errorHandler(403, 'Forbidden'))
        }
        
        // if verified then pass the request to the next middleware
        next()
    })
}

export default verifyToken