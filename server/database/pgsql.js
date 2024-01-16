import pkg from 'pg'
const {Pool} = pkg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432, // Default PostgreSQL port
  password: 'rootUser',
  database: 'programsInst',
})

pool.connect()
.then(() => console.log("Connected to PostgreSQL Database"))
.catch((err) => console.log(err))

export default pool
