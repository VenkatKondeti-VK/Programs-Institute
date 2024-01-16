import express from 'express'
import cors from 'cors'
import programRouter from './routes/programRoute.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/program', programRouter)
app.use('/api/auth', authRouter)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


app.listen(3000, (req, res) => {
    console.log("Server running on port 3000")
})