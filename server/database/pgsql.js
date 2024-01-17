import pkg from 'pg'
const {Pool} = pkg

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: 5432, // Default PostgreSQL port
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
})

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS public.programs (
    p_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price BIGINT NOT NULL,
    domain VARCHAR(255) NOT NULL,
    prog_type VARCHAR(255) NOT NULL,
    reg_type VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assurance BOOLEAN,
    img_url VARCHAR(255) NOT NULL,
    uni_name VARCHAR(255) NOT NULL,
    faculty_profile VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    deg_type VARCHAR(255) NOT NULL,
    criteria VARCHAR(255),
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// ** need to update the last_modified to TIMESTAMPTZ **

pool.connect()
.then(() => console.log("Connected to PostgreSQL Database"))
.then(() => {
  pool.query(createTableQuery, (error, result) => {
    if (error) {
      console.error('Error creating table:', error);
    } else {
      console.log('Table created successfully');
    }
  });
})
.catch((err) => console.log(err))

export default pool
