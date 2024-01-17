import {errorHandler} from '../utils/error.js'
import pool from '../database/pgsql.js'


export const createProgram = async (req, res, next) => {
    try {
        const progData = req.body

        // Extract column names and values from the JSON object
        const columns = Object.keys(progData).join(', ');
        const values = Object.values(progData);

        // Create a parameterized query string
        const query = `
            INSERT INTO programs (${columns})
            VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
            RETURNING *;`
        
        const newProgram = await pool.query(query, values)

        res.status(200).json(newProgram.rows[0])
    } 
    catch (error) {
        next(error)
    }
}


export const getPrograms = async (req, res, next) => {
    try{
        const searchTerm = req.query.searchTerm || ""
        const domainTerm = req.query.domain || ""

        const query = `SELECT * FROM programs WHERE name ILIKE $1 AND domain ILIKE $2`
        const allPrograms = await pool.query(query, [`%${searchTerm}%`, `%${domainTerm}%`])

        res.status(200).json(allPrograms.rows)
    }
    catch(error){
        next(error)
    }
}


export const getProgram = async (req, res, next) => {
    try {
        const progId = req.params.id
        const query = `SELECT * FROM programs WHERE p_id = ${progId}`

        const program = await pool.query(query)

        if(program.rows.length === 0){
            return next(errorHandler(404, 'Program not found'))
        }

        res.status(200).json(program.rows[0])
    } 
    catch (error) {
        next(error)
    }
}


export const updateProgram = async (req, res, next) => {
    try {
        const progId = req.params.id
        const progData = req.body

        const findQuery = `SELECT * FROM programs WHERE p_id = ${progId}`

        const program = await pool.query(findQuery)
        if(program.rows.length === 0){
            return next(errorHandler(404, 'Program not found. Cannot Update'))
        }

        // Extract column names and values from the JSON object
        let columns = Object.keys(progData).join(', ');
        console.log(columns)

        let values = Object.values(progData);
        const currDate = new Date()
        values.last_modifed = currDate

        // Create a parameterized query string
        const query = `
            UPDATE programs 
            SET (${columns}) = (${values.map((_, index) => `$${index + 1}`).join(', ')})
            WHERE p_id = ${progId}
            RETURNING *;`

        const updatedProgram = await pool.query(query, values)
        res.status(200).json(updatedProgram.rows[0])
    } 
    catch (error) {
        next(error)    
    }
}

export const deleteProgram = async (req, res, next) => {
    try {
        const progId = req.params.id

        const findQuery = `SELECT * FROM programs WHERE p_id = ${progId}`

        const program = await pool.query(findQuery)
        if(program.rows.length === 0){
            return next(errorHandler(404, 'Program not found. Cannot Delete'))
        }

        const query = `
            DELETE FROM programs 
            WHERE p_id = ${progId} RETURNING *`

        const deletedProgram = await pool.query(query)
        res.status(200).json(deletedProgram.rows[0])
    } 
    catch (error) {
        next(error)    
    }
}
