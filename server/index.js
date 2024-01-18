import express from 'express'
import cors from 'cors'
import programRouter from './routes/programRoute.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

const __dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())

// app.use(cors())    * No need to use cors as both frontend and backend are hosted on same server *

app.use('/api/program', programRouter)
app.use('/api/auth', authRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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
