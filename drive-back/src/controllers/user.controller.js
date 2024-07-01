export const getUser = (req,res)=>{

}


import pool from "../db.js";
import jwt from 'jsonwebtoken';

export const getDrivers = async (req, res) => {
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
        const q = ` SELECT u.id, u.name, u.picture as img, r.tipo as role 
                    FROM users AS u
                    LEFT JOIN roles AS r ON u.roleid = r.roleid
                    WHERE r.tipo = 'Conductor'`;
        const result = await client.query(q);

    

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la lista de conductores' });
    } finally {
        client.release();
    }
};
