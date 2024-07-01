import pool from "../db.js";
import jwt from 'jsonwebtoken';

export const createWaitTime = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const { rideId, destinationId, startTime } = req.body;

    if (!rideId || !destinationId || !startTime) {
        return res.status(400).json("Faltan parámetros requeridos");
    }

    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO WaitTimes (rideId, destinationId, startTime)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const result = await client.query(query, [rideId, destinationId, startTime]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error al crear el tiempo de espera:", err);
        res.status(500).json("Error al crear el tiempo de espera");
    } finally {
        client.release();
    }
};
