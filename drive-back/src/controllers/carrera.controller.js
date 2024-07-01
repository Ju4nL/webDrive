import pool from "../db.js";
import jwt from 'jsonwebtoken';

export const getRides = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const client = await pool.connect();
    
    try {
        let q = '';
        let values = [];
        
        if (userInfo.role === 'Admin') {
            q = `SELECT ri.*, d.name as driverName, cl.name as clientName
                 FROM rides AS ri 
                 LEFT JOIN users AS d ON d.id = ri.driverid
                 LEFT JOIN users AS cl ON cl.id = ri.clientid`;
        } else if (userInfo.role === 'Conductor') {
            q = `SELECT ri.*, d.name as driverName, cl.name as clientName
                 FROM rides AS ri 
                 LEFT JOIN users AS d ON d.id = ri.driverid
                 LEFT JOIN users AS cl ON cl.id = ri.clientid
                 WHERE ri.driverid = $1 OR ri.driverid IS NULL`;
            values = [userInfo.id];
        } else if (userInfo.role === 'Cliente') {
            q = `SELECT ri.*, d.name as driverName, cl.name as clientName
                 FROM rides AS ri 
                 LEFT JOIN users AS d ON d.id = ri.driverid
                 LEFT JOIN users AS cl ON cl.id = ri.clientid
                 WHERE ri.clientid = $1`;
            values = [userInfo.id];
        }

        const result = await client.query(q, values);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las carreras' });
    } finally {
        client.release();
    }
};


export const updateRideDriver = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const { rideId, driverId } = req.body;

    if (!rideId || !driverId) {
        return res.status(400).json({ error: 'Falta rideId o driverId' });
    }

    const client = await pool.connect();

    try {
        const q = `UPDATE rides SET driverid = $1 WHERE rideid = $2 RETURNING *`;
        const values = [driverId, rideId];

        const result = await client.query(q, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el conductor de la carrera' });
    } finally {
        client.release();
    }
};