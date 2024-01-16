import pkg from 'pg'
const {Pool} = pkg

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: 5432, // Default PostgreSQL port
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
})

pool.connect()
.then(() => {
  pool.query(`CREATE TABLE IF NOT EXISTS public.programs
  (
      p_id integer NOT NULL DEFAULT nextval('programs_p_id_seq'::regclass),
      name character varying COLLATE pg_catalog."default" NOT NULL,
      price bigint NOT NULL,
      domain character varying COLLATE pg_catalog."default" NOT NULL,
      prog_type character varying COLLATE pg_catalog."default" NOT NULL,
      reg_type character varying COLLATE pg_catalog."default" NOT NULL,
      description character varying COLLATE pg_catalog."default" NOT NULL,
      assurance boolean,
      img_url character varying COLLATE pg_catalog."default" NOT NULL,
      uni_name character varying COLLATE pg_catalog."default" NOT NULL,
      faculty_profile character varying COLLATE pg_catalog."default" NOT NULL,
      duration character varying COLLATE pg_catalog."default" NOT NULL,
      deg_type character varying COLLATE pg_catalog."default" NOT NULL,
      criteria character varying COLLATE pg_catalog."default",
      last_modified timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT programs_pkey PRIMARY KEY (p_id)
  )`)
})
.then(() => console.log("Connected to PostgreSQL Database"))
.then(() => {
  console.log("created table programs")
})
.catch((err) => console.log(err))

export default pool
