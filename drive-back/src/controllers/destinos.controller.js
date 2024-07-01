import pool from "../db.js";
import jwt from 'jsonwebtoken';
import format from 'pg-format';


export const getDestinations = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const { rideId } = req.params;
    if (!rideId) return res.status(400).json("Falta el ID del viaje");

    const client = await pool.connect();
    try {
        const q = `SELECT * FROM Destinations WHERE rideId = $1 ORDER BY orderNum`;
        const { rows } = await client.query(q, [rideId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Destinos no encontrados" });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los destinos:", error);
        res.status(500).json("Error al obtener los destinos");
    } finally {
        client.release();
    }
};


export const addDestination = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const client = await pool.connect();
    try {
        const query = format(`INSERT INTO Destinations (rideid, ordernum, startlocation, endlocation) VALUES (%L)`, [
            req.body.rideid,
            req.body.ordernum,
            req.body.startlocation,
            req.body.endlocation
        ]);

        await client.query(query);

        res.status(200).json("Destino Creado");
    } catch (error) {
        console.error("Error al crear el destino:", error);
        res.status(500).json("Error al crear el destino");
    } finally {
        client.release();
    }
};


export const updateDestinationStatus = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No está logueado");

    let userInfo;
    try {
        userInfo = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
        return res.status(403).json("Token no es válido");
    }

    const { id, status } = req.body;
    const timestamp = new Date().toISOString();

    const client = await pool.connect();
    try {
        let q = '';
        let waitTimeQuery = '';
        let waitTimeValues = [];

        if (status === 'espera') {
            q = `UPDATE Destinations SET arrivaltime = $1 WHERE destinationid = $2 RETURNING *`;
        } else if (status === 'iniciando') {
            q = `UPDATE Destinations SET departuretime = $1 WHERE destinationid = $2 RETURNING *`;
            waitTimeQuery = `UPDATE WaitTimes SET endTime = $1, waitTime = EXTRACT(EPOCH FROM ($1 - startTime))::INTEGER WHERE destinationId = $2 RETURNING *`;
            waitTimeValues = [timestamp, id];
        } else if (status === 'fin') {
            q = `UPDATE Destinations SET finishtime = $1 WHERE destinationid = $2 RETURNING *`;
        }

        const result = await client.query(q, [timestamp, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Destino no encontrado" });
        }

        if (waitTimeQuery) {
            await client.query(waitTimeQuery, waitTimeValues);
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error updating destination time:", err);
        res.status(500).json("Error updating destination time");
    } finally {
        client.release();
    }
};