import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new pg.Pool({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE,
    ssl: {
        rejectUnauthorized: false // Ajusta esto según tus necesidades de seguridad
    }
});

export default pool;