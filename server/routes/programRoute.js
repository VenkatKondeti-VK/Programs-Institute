import express from 'express'
import { getProgram, getPrograms, createProgram, updateProgram, deleteProgram } from '../controllers/programController.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create', verifyToken, createProgram)
router.get('/get/:id', verifyToken, getProgram)
router.get('/get', verifyToken, getPrograms)
router.put('/update/:id', verifyToken, updateProgram)
router.delete('/delete/:id', verifyToken, deleteProgram)

export default router