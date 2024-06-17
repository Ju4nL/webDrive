import pool from './db.js';
import bcrypt from 'bcryptjs';

(async () => {
    const client = await pool.connect();
    try {
        const username = 'user1';
        const email = 'test@test.com';
        const password = '12345';
        const name = 'test';

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createUserQuery = `
            INSERT INTO users (username, email, password, name)
            VALUES ($1, $2, $3, $4)
        `;

        await client.query(createUserQuery, [username, email, hashedPassword, name]);
        console.log('Usuario creado exitosamente.');
    } catch (error) {
        console.error('Error al conectar:', error);
    } finally {
        client.release(); // Liberar el cliente de la conexión
        await pool.end(); // Cerrar el pool de conexiones
    }
})();
